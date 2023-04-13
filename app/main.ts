import fastify, { FastifyServerOptions } from "fastify";
import authRoutes from "./routes/auth.route.js";
import mysqlInstance from "./plugins/mysql.js";
import fastifySwagger from "@fastify/swagger";
import { swaggerConfig } from "./common/config.js";
import jwtInstance from "./plugins/jwt.js";
import userRoutes from "./routes/user.route.js";
import fastifyBcrypt from "fastify-bcrypt";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import dotenv from "./plugins/dotenv.js";
import routineRoutes from "./routes/routine.route.js";
import todoRoutes from "./routes/todo.route.js";
import fastifyBlipp from "fastify-blipp";
import cors from "@fastify/cors";

const build = (options: FastifyServerOptions) => {
	const app = fastify(options).withTypeProvider();

	const ajv = addFormats
		.default(new Ajv.default({}), [
			"date-time",
			"time",
			"date",
			"email",
			"hostname",
			"ipv4",
			"ipv6",
			"uri",
			"uri-reference",
			"uuid",
			"uri-template",
			"json-pointer",
			"relative-json-pointer",
			"regex",
		])
		.addKeyword("kind")
		.addKeyword("modifier");

	app.register(dotenv);
	app.register(fastifyBlipp);
	app.register(mysqlInstance);
	app.register(fastifyBcrypt.default, {
		saltWorkFactor: 12,
	});
	app.register(jwtInstance);
	app.register(fastifySwagger.default, swaggerConfig);
	app.register(cors, {
		origin: "*",
	});
	app.register(authRoutes, { prefix: "/auth" });
	app.register(userRoutes, { prefix: "/user" });
	app.register(routineRoutes, { prefix: "/routine" });
	app.register(todoRoutes, { prefix: "/todo" });

	app.setValidatorCompiler(({ schema }) => {
		return ajv.compile(schema);
	});

	return app;
};

export default build;
