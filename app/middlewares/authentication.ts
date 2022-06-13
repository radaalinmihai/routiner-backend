import { FastifyInstance } from "fastify";
import { onRequestHookHandler } from "fastify/types/hooks";
import { UserJWT } from "../models/user.model";

const authenticationMiddleware =
  (fastify: FastifyInstance): onRequestHookHandler =>
  async (request, reply) => {
    if (!request.headers.authorization) {
      return reply.code(403).send({
        message: "Bearer token is empty",
      });
    }
    try {
      const authToken = request.headers.authorization.split("Bearer ")[1];
      request.user = await fastify.jwt.verify<UserJWT>(authToken);
    } catch (err) {
      fastify.log.error(err);
      return reply.code(400).send({
        message: "Token expired",
      });
    }
  };

export default authenticationMiddleware;
