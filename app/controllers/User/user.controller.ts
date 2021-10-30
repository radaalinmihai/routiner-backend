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
  const { username, email, password } = body;
  server.mysql
    .query("SELECT * FROM users WHERE email=?", [email])
    .then((res) => {
      const [rows, fields] = res.entries();
      server.log.info("fields", rows);
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
