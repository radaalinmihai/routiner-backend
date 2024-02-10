import { UserModel, UserReply, UserRetrieve } from "../../models/user.model.js";
import { RouteHandler } from "../../types/IHandler.js";
import { RowDataPacket, OkPacket } from "mysql2";

export const loginHandler: RouteHandler<{ Body: UserModel; Reply: UserReply }> = async (
	req,
	reply,
) => {
	const { server, body } = req;
	const [userRows] = await server.mysql.query<RowDataPacket[]>(
		"SELECT * FROM users WHERE email=?",
		[body.email],
	);
	if (!userRows.length) {
		return reply.code(404).send({
			message: `No user with email ${body.email} found`,
		});
	}
	const userRow = userRows[0] as UserModel;
	const passwordIsValid = await server.bcrypt.compare(body.password, userRow.password);
	if (!passwordIsValid) {
		return reply.code(401).send({
			message: "Wrong credentials",
		});
	}
	const token = server.jwt.sign(
		{
			userId: userRow.userId,
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
	try {
		const encryptedPassword = await server.bcrypt.hash(password);
		await server.mysql.query("INSERT INTO users (username, password, email) VALUES (?, ?, ?)", [
			username,
			encryptedPassword,
			email,
		]);
		const [lastRow] = await server.mysql.query<UserModel[]>(
			"SELECT userId FROM users WHERE id=(SELECT last_insert_id())",
		);
		const token = server.jwt.sign(
			{
				userId: lastRow[0].userId,
			},
			{
				expiresIn: "7d",
			},
		);
		return reply.send({
			message: "User registered successfully",
			access_token: token,
		});
	} catch (err: any) {
		switch (err.code) {
			case "ER_DUP_ENTRY":
				return reply.code(400).send({
					message: `An account with the following email '${email}' already exists.`,
				});
		}
		return reply.code(400).send({
			message: "Wrong request",
		});
	}
};

export const getUserHandler: RouteHandler = async (req, reply) => {
	const { server, user } = req;
	const [userData] = await server.mysql.query<UserRetrieve[]>(
		"SELECT username, email, id, userId FROM users WHERE userId=?",
		[user.userId],
	);
	if (!userData.length) {
		return reply.code(404).send({
			message: `No user with id ${user.userId}`,
		});
	}
	return reply.send(userData[0]);
};

export const deleteUserHandler: RouteHandler = async (request, reply) => {
	const { server, user } = request;
	try {
		const [row] = await server.mysql.query<OkPacket>("DELETE FROM `users` WHERE `userId`=?", [
			user.userId,
		]);
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
		message: `No user with id "${user.userId}" found`,
	});
};

export const patchUserHandler: RouteHandler<{
	Body: Partial<UserModel>;
}> = async (request, reply) => {
	const { server, body, user } = request;
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
			[body.username, password, body.email, user.userId],
		);
		const [newUser] = await server.mysql.query<UserRetrieve[]>(
			"SELECT id, username, email, userId FROM users WHERE userId=?",
			[user.userId],
		);
		return reply.send(newUser[0]);
	} catch (err) {
		server.log.error(err);
	}
	return reply.code(400).send({
		message: "Something happened",
	});
};
