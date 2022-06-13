import { FastifyInstance } from "fastify";
import fastifyEnv from "@fastify/env";
import { envConfig } from "../common/config";
import fp from "fastify-plugin";

async function dotenv(fastify: FastifyInstance) {
	try {
		fastify.register(fastifyEnv, envConfig);
	} catch (err) {
		fastify.log.error(err);
	}
}

export default fp(dotenv, {
	name: "envInstance",
});
