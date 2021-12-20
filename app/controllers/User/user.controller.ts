import {
	UserModel,
	UserParams,
	UserReply,
	UserRetrieve,
} from "../../models/user.model";
import { handlePromise } from "../../common/helpers";
import { RouteHandler } from "../../types/IHandler";
import { IError } from "../../types/Errors";

export const loginHandler: RouteHandler<{ Body: UserModel; Reply: UserReply }> =
	async (req, reply) => {
		const { server, body } = req;
		const { username, password } = body;
		const [error, res] = await handlePromise(
			server.mysql.query("SELECT * FROM users WHERE username=?", [username]),
		);
		server.log.info(res);
		return reply.send({
			access_token: "sdfdsfgdfg",
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
		"INSERT INTO users (username, password) VALUES (?, ?)",
		[username, encryptedPassword],
	);
	server.log.info(rows);
	reply.send({
		access_token: "User registered successfully",
	});
};

export const getUserHandler: RouteHandler<{
	Reply: UserRetrieve;
	Params: UserParams;
}> = async (req, reply) => {
	const { server } = req;
	const { id } = req.params;
	const [error, userData] = await handlePromise(
		server.mysql.execute(
			"SELECT username, email, id, userId FROM users WHERE userId=?",
			[id],
		),
	);
	if (error) {
		throw new Error(error);
	}
	const [rows] = userData;
	if (!rows.length) {
		const err: IError = {
			...new Error(`No user with id ${id}`),
			statusCode: 404,
		};
		throw err;
	}
	server.log.info(rows);
	reply.send(rows[0]);
};
