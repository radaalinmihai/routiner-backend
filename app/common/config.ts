import type { SwaggerOptions } from "@fastify/swagger";

export const schemaEnv = {
	type: "object",
	required: [
		"DATABASE_USERNAME",
		"DATABASE_PASSWORD",
		"DATABASE_NAME",
		"DATABASE_HOST",
		"JWT_SECRET",
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
		JWT_SECRET: {
			type: "string",
		},
	},
};

export const envConfig = {
	confKey: "environmentConfiguration",
	schema: schemaEnv,
	dotenv: true,
};

export const swaggerConfig: SwaggerOptions = {
	routePrefix: "/api-docs",
	exposeRoute: true,
	openapi: {
		tags: [{ name: "Auth" }, { name: "Routines" }, { name: "User" }],
		info: {
			title: "Test",
			description: "",
			version: "1.0",
		},
		components: {
			schemas: {
				User: {
					type: "object",
					required: ["username", "email", "password"],
					properties: {
						username: { type: "string" },
						password: { type: "string", format: "password" },
						email: { type: "string", format: "email" },
					},
				},
			},
			securitySchemes: {
				bearerAuth: {
					type: "http",
					scheme: "bearer",
					bearerFormat: "JWT",
				},
			},
		},
	},
};
