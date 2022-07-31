import { FastifyInstance } from "fastify";
import fastifyMySQL from "@fastify/mysql";
import fp from "fastify-plugin";

async function mysqlInstance(fastify: FastifyInstance) {
	fastify.log.info(fastify.environmentConfiguration);
	try {
		const { DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_HOST, DATABASE_NAME } =
			fastify.environmentConfiguration;
		fastify.register(fastifyMySQL, {
			type: "connection",
			user: DATABASE_USERNAME,
			host: DATABASE_HOST,
			database: DATABASE_NAME,
			password: DATABASE_PASSWORD,
			promise: true,
			enableKeepAlive: true,
			multipleStatements: true,
		});
	} catch (err) {
		fastify.log.error(err);
	}
}

export default fp(mysqlInstance, {
	name: "mysqlInstance",
	dependencies: ["envInstance"],
});
