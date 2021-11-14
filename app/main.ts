import fastify from "fastify";
import fastifyBlipp from "fastify-blipp";
import authRoutes from "./routes/auth.route";
import dotenv from "./plugins/dotenv";
import mysqlInstance from "./plugins/mysql";
import fastifySwagger from "fastify-swagger";
import { swaggerConfig } from "./common/config";
import fastifyBcrypt from "./plugins/bcrypt";
import userRoutes from "./routes/user.route";

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
server.register(userRoutes);

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
