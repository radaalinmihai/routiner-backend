import fastify, { FastifyServerOptions } from "fastify";
import fastifyBlipp from "fastify-blipp";
import authRoutes from "./routes/auth.route";
import mysqlInstance from "./plugins/mysql";
import fastifySwagger from "@fastify/swagger";
import { swaggerConfig } from "./common/config";
import jwtInstance from "./plugins/jwt";
import userRoutes from "./routes/user.route";
import fastifyBcrypt from "fastify-bcrypt";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import dotenv from "./plugins/dotenv";
import routineRoutes from "./routes/routine.route";
import todoRoutes from "./routes/todo.route";

const build = (options: FastifyServerOptions) => {
	const app = fastify(options).withTypeProvider();

	const ajv = addFormats(new Ajv({}), [
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
	app.register(fastifyBcrypt, {
		saltWorkFactor: 12,
	});
	app.register(jwtInstance);
	app.register(fastifySwagger, swaggerConfig);
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
