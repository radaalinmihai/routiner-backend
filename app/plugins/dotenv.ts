import { FastifyInstance } from "fastify";
import fastifyEnv from "fastify-env";
import { envConfig } from "../common/config";
import fp from "fastify-plugin";
import fastifyJWT from "fastify-jwt";

async function dotenv(fastify: FastifyInstance) {
	fastify.register(fastifyEnv, envConfig).ready((err) => {
		if (err) fastify.log.error(err);

		fastify.log.info(fastify.environmentConfiguration);
		fastify.register(fastifyJWT, {
			secret: fastify.environmentConfiguration.JWT_SECRET,
		});
	});
}

export default fp(dotenv, {
	fastify: "3.x.x",
	name: "dotenv",
});
