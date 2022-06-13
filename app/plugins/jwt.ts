import { FastifyInstance } from "fastify";
import fastifyJwt from "@fastify/jwt";
import fp from "fastify-plugin";

async function jwtInstance(fastify: FastifyInstance) {
  try {
    fastify.register(fastifyJwt, {
      secret: fastify.environmentConfiguration.JWT_SECRET,
    });
  } catch (err) {
    fastify.log.error(err);
  }
}

export default fp(jwtInstance, {
  name: "jwtInstance",
});
