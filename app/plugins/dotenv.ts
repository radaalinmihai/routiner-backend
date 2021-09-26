import {FastifyInstance, FastifyRegisterOptions} from "fastify";
import fastifyEnv from "fastify-env";
import {envConfig} from "../common/config";
import fp from "fastify-plugin";

async function dotenv(fastify: FastifyInstance) {
	fastify
		.register(fastifyEnv, envConfig)
		.ready((err) => {
		if (err) console.error(err);

		console.log(fastify.environmentConfiguration);
	});
}

export default fp(dotenv, {
	fastify: '3.x',
	name: 'dotenv'
});
