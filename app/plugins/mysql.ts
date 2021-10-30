import { FastifyInstance } from "fastify";
import fastifyMySQL from "fastify-mysql";
import fp from "fastify-plugin";

async function mysqlInstance(fastify: FastifyInstance) {
	const {
		DATABASE_USERNAME,
		DATABASE_PASSWORD,
		DATABASE_HOST,
		DATABASE_NAME,
	} = fastify.environmentConfiguration;
	fastify
		.register(fastifyMySQL, {
			type: "connection",
			user: DATABASE_USERNAME,
			host: DATABASE_HOST,
			database: DATABASE_NAME,
			password: DATABASE_PASSWORD,
			promise: true,
		})
		.ready((err) => {
			if (err) fastify.log.error(err);

			fastify.log.info(fastify.mysql.connection);
		});
}

export default fp(mysqlInstance, {
	fastify: "3.x",
	name: "mysqlInstance",
});
