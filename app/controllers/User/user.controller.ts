import {
	ContextConfigDefault,
	RawReplyDefaultExpression,
	RawRequestDefaultExpression,
	RawServerBase,
	RouteHandlerMethod,
} from "fastify";
import {
	UserModel,
	UserParams,
	UserReply,
	UserRetrieve,
} from "../../models/user.model";
import { handlePromise } from "../../common/helpers";

export const loginHandler: RouteHandlerMethod<
	RawServerBase,
	RawRequestDefaultExpression,
	RawReplyDefaultExpression,
	{ Body: UserModel; Reply: UserReply },
	ContextConfigDefault
> = (req, reply) => {
	const { server, body } = req;
	const { username, password } = body;
	server.mysql
		.query("SELECT * FROM users WHERE username=?", [username])
		.then((res) => {
			const [rows, fields] = res;
			server.log.info("rows!~", rows, fields);
			return reply.send({
				access_token: "another access token lol",
			});
		})
		.catch((err) => {
			server.log.error(err);
		});
};

export const registerHandler: RouteHandlerMethod<
	RawServerBase,
	RawRequestDefaultExpression,
	RawReplyDefaultExpression,
	{ Body: UserModel; Reply: UserReply },
	ContextConfigDefault
> = async (req, reply) => {
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

export const getUserHandler: RouteHandlerMethod<
	RawServerBase,
	RawRequestDefaultExpression,
	RawReplyDefaultExpression,
	{ Reply: UserRetrieve; Params: UserParams },
	ContextConfigDefault
> = async (req, reply) => {
	const { server } = req;
	server.log.info("QUERY", req.params);
	const { userId } = req.params;
	const [error, userData] = await handlePromise(
		server.mysql.execute(
			"SELECT username, email, id, userId FROM users WHERE userId=?",
			[userId],
		),
	);
	if (error) {
		throw new Error(error);
	}
	const [rows] = userData;
	if (!rows.length) {
		throw new Error(`No user with id ${userId}`);
	}
	server.log.info(rows);
	reply.send(rows[0]);
};
