import { FastifyInstance } from "fastify";
import fastifyPostgres from "@fastify/postgres";
import fp from "fastify-plugin";

async function pgInstance(fastify: FastifyInstance) {
	fastify.log.info(fastify.environmentConfiguration);
	try {
		const { DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_HOST, DATABASE_NAME } =
			fastify.environmentConfiguration;
		fastify.register(fastifyPostgres, {
			connectionString: `postgres://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}/${DATABASE_NAME}`,
		});
		fastify.log.info(fastify.pg)
	} catch (err) {
		fastify.log.error(err);
	}
}

const pgPlugin = fp(pgInstance, {
	name: "pgInstance",
	dependencies: ["envInstance"],
});

export { pgPlugin as default };
