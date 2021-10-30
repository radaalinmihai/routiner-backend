import { FastifyRegisterOptions } from "fastify";
import fastifyBearerAuth from "fastify-bearer-auth";
import { ErrorTypes } from "../types/Errors";
import { SwaggerOptions } from "fastify-swagger";

export const schemaEnv = {
	type: "object",
	required: [
		"DATABASE_USERNAME",
		"DATABASE_PASSWORD",
		"DATABASE_NAME",
		"DATABASE_HOST",
	],
	properties: {
		DATABASE_USERNAME: {
			type: "string",
		},
		DATABASE_PASSWORD: {
			type: "string",
		},
		DATABASE_NAME: {
			type: "string",
		},
		DATABASE_HOST: {
			type: "string",
		},
	},
};

export const envConfig = {
	confKey: "environmentConfiguration",
	schema: schemaEnv,
	dotenv: true,
	data: process.env,
};

export const authConfig: FastifyRegisterOptions<fastifyBearerAuth.FastifyBearerAuthOptions> =
	{
		keys: new Set(),
		addHook: true,
		errorResponse: (err) => {
			return {
				error: ErrorTypes.ERR_AUTH,
				message: err.message,
			};
		},
	};

export const swaggerConfig: SwaggerOptions = {
	routePrefix: "/api-docs",
	exposeRoute: true,
	swagger: {
		info: {
			title: "Test",
			description: "Testing",
			version: "1.0",
		},
		schemes: ["http"],
		consumes: ["application/json"],
		produces: ["application/json"],
		tags: [{ name: "User" }, { name: "Routines" }],
		securityDefinitions: {
			apiKey: {
				type: "apiKey",
				name: "apiKey",
				in: "header",
			},
		},
		definitions: {
			User: {
				type: "object",
				required: ["username", "email", "password"],
				properties: {
					username: { type: "string" },
					password: { type: "string" },
					email: { type: "string", format: "email" },
				},
			},
		},
	},
};
