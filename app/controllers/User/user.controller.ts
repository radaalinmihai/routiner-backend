import {
	ContextConfigDefault,
	RawReplyDefaultExpression,
	RawRequestDefaultExpression,
	RawServerBase,
	RouteHandlerMethod,
} from "fastify";
import { UserBody, UserReturn } from "../../models/user.model";

export const loginHandler: RouteHandlerMethod<
	RawServerBase,
	RawRequestDefaultExpression,
	RawReplyDefaultExpression,
	{ Body: UserBody; Reply: UserReturn },
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
	{ Body: UserBody; Reply: UserReturn },
	ContextConfigDefault
> = (req, reply) => {
	const { server, body } = req;
	const { username, email, password } = body;
	server.mysql;
};
