import {
	UserModel,
	UserParams,
	UserReply,
	UserRetrieve,
} from "../../models/user.model";
import { RouteHandler } from "../../types/IHandler";
import { RowDataPacket, OkPacket } from "mysql2";

export const loginHandler: RouteHandler<{ Body: UserModel; Reply: UserReply }> =
	async (req, reply) => {
		const { server, body } = req;
		const [userRows] = await server.mysql.query<RowDataPacket[]>(
			"SELECT * FROM users WHERE username=?",
			[body.username],
		);
		if (!userRows.length) {
			return reply.code(404).send({
				message: `No user with name ${body.username} found`,
			});
		}
		const userRow = userRows[0] as UserModel;
		const passwordIsValid = await server.bcrypt.compare(
			body.password,
			userRow.password,
		);
		if (!passwordIsValid) {
			return reply.code(401).send({
				message: "Wrong credentials",
			});
		}
		const token = server.jwt.sign(
			{
				email: userRow.email,
				userId: userRow.userId,
				username: userRow.username,
			},
			{
				expiresIn: "7d",
			},
		);
		return reply.send({
			message: "Login successfully, redirecting..",
			access_token: token,
		});
	};

export const registerHandler: RouteHandler<{
	Body: UserModel;
	Reply: UserReply;
}> = async (req, reply) => {
	const { server, body } = req;
	const { username, email, password } = body;
	const encryptedPassword = await server.bcrypt.hash(password);
	const [rows, fields] = await server.mysql.query(
		"INSERT INTO users (username, password, email) VALUES (?, ?, ?)",
		[username, encryptedPassword, email || null],
	);
	const [lastRow] = await server.mysql.query<RowDataPacket[]>(
		"SELECT userId FROM users WHERE id=(SELECT last_insert_id())",
	);
	const token = server.jwt.sign(
		{
			email,
			username,
			userId: lastRow[0].userId,
		},
		{
			expiresIn: "7d",
		},
	);
	console.log("!!!", lastRow);
	reply.send({
		message: "User registered successfully",
		access_token: token,
	});
};

export const getUserHandler: RouteHandler<{
	Params: UserParams;
}> = async (req, reply) => {
	const { server } = req;
	const { id } = req.params;
	const [userData] = await server.mysql.query<UserRetrieve[]>(
		"SELECT username, email, id, userId FROM users WHERE userId=?",
		[id],
	);
	if (!userData.length) {
		return reply.code(404).send({
			message: `No user with id ${id}`,
		});
	}
	return reply.send(userData[0]);
};

export const deleteUserHandler: RouteHandler<{
	Params: UserParams;
}> = async (request, reply) => {
	const { server, params } = request;
	const { id } = params;
	if (!id) {
		return reply.code(400).send({
			message: "id parameter is required",
		});
	}
	try {
		const [row] = await server.mysql.query<OkPacket>(
			"DELETE FROM `users` WHERE `userId`=?",
			[id],
		);
		server.log.info("FIELDS");
		server.log.info(row);
		if (row.affectedRows) {
			return reply.send({
				message: "User deleted",
			});
		}
	} catch (err) {
		server.log.error(err);
	}
	return reply.code(404).send({
		message: `No user with id "${id}" found`,
	});
};

export const patchUserHandler: RouteHandler<{
	Params: UserParams;
	Body: Partial<UserModel>;
}> = async (request, reply) => {
	const { server, body, user, params } = request;
	const { id } = params;
	try {
		let password = "";
		if (body.password) {
			password = await server.bcrypt.hash(body.password);
		}
		await server.mysql.query(
			`UPDATE users 
SET username = COALESCE(NULLIF(?, ""), username),
		password = COALESCE(NULLIF(?, ""), password),
		email = COALESCE(NULLIF(?, ""), email) 
WHERE userId=?`,
			[body.username, password, body.email, id],
		);
		const [newUser] = await server.mysql.query<UserRetrieve[]>(
			"SELECT id, username, email, userId FROM users WHERE userId=?",
			[id],
		);
		return reply.send(newUser[0]);
	} catch (err) {
		server.log.error(err);
	}
	return reply.code(400).send({
		message: "Something happened",
	});
};
