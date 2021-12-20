import fastify, { FastifyServerOptions } from "fastify";
import fastifyBlipp from "fastify-blipp";
import authRoutes from "./routes/auth.route";
import dotenv from "./plugins/dotenv";
import mysqlInstance from "./plugins/mysql";
import fastifySwagger from "fastify-swagger";
import { swaggerConfig } from "./common/config";
import fastifyBcrypt from "./plugins/bcrypt";
import userRoutes from "./routes/user.route";

const build = (options?: FastifyServerOptions) => {
	const app = fastify(options);

	app.register(fastifyBlipp);
	app.register(dotenv);
	app.register(mysqlInstance);
	app.register(fastifyBcrypt, { saltWorkFactor: 16 });
	app.register(fastifySwagger, swaggerConfig);
	app.register(authRoutes, { prefix: "/auth" });
	app.register(userRoutes);

	return app;
};

export default build;
