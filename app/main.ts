import fastify from "fastify";
import fastifyBlipp from "fastify-blipp";
import authRoutes from "./routes/auth";
import dotenv from "./plugins/dotenv";
import mysqlInstance from "./plugins/mysql";
import fastifySwagger from "fastify-swagger";
import { swaggerConfig } from "./common/config";
import fastifyBcrypt from "./plugins/bcrypt";

const server = fastify({
	logger: {
		prettyPrint: true,
	},
});

server.register(fastifyBlipp);
server.register(dotenv);
server.register(mysqlInstance);
server.register(fastifyBcrypt, { saltWorkFactor: 16 });
server.register(fastifySwagger, swaggerConfig);
server.register(authRoutes, { prefix: "/auth" });

const start = async () => {
	try {
		await server.listen(3000);

		server.blipp();
		server.swagger();
	} catch (err) {
		server.log.error(err);
		process.exit(1);
	}
};

start();
