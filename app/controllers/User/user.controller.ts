import { UserModel, UserReply, UserRetrieve } from "../../models/user.model.js";
import { RouteHandler } from "../../types/IHandler.js";
import {
	DELETE_USER_QUERY,
	GET_USER_BY_EMAIL_QUERY,
	GET_USER_QUERY,
	GET_USER_ROUTINES_QUERY,
	INSERT_GET_USER_IMMEDIETALY_QUERY,
	INSERT_USER_QUERY,
	UPDATE_USER_QUERY,
} from "../../common/queries.js";

export const loginHandler: RouteHandler<{ Body: UserModel; Reply: UserReply }> = async (
	req,
	reply,
) => {
	const { server, body } = req;
	const { rows: userRows } = await server.pg.query<UserModel>(GET_USER_BY_EMAIL_QUERY, [
		body.email,
	]);
	if (!userRows.length) {
		return reply.code(404).send({
			message: `No user with email ${body.email} found`,
		});
	}
	const userRow = userRows[0];
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
		await server.pg.query(INSERT_USER_QUERY, [username, encryptedPassword, email]);
		const { rows: lastRow } = await server.pg.query<UserModel>(INSERT_GET_USER_IMMEDIETALY_QUERY);
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
		server.log.error(err);
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
	const { rows: userData } = await server.pg.query<UserRetrieve>(GET_USER_QUERY, [user.userId]);
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
		const { rowCount } = await server.pg.query(DELETE_USER_QUERY, [user.userId]);
		if (rowCount) {
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
		await server.pg.query(UPDATE_USER_QUERY, [body.username, password, body.email, user.userId]);
		const { rows: newUser } = await server.pg.query<UserRetrieve>(GET_USER_QUERY, [user.userId]);
		return reply.send(newUser[0]);
	} catch (err) {
		server.log.error(err);
	}
	return reply.code(400).send({
		message: "Something happened",
	});
};

export const getUserRoutines: RouteHandler = async (request, reply) => {
	const { server, user } = request;
	const { rows: data } = await server.pg.query(GET_USER_ROUTINES_QUERY, [user.userId]);
	return reply.send({
		data,
	});
};
