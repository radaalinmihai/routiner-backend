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
			default: "localhost",
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
		tags: [{ name: "Auth" }, { name: "User" }, { name: "Routine" }, { name: "To do" }],
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
				Routine: {
					type: "object",
					required: ["id", "title", "created_at", "start_date", "end_date", "modified_at"],
					properties: {
						id: { type: "string" },
						title: { type: "string" },
						description: { type: "string" },
						created_at: { type: "string" },
						start_date: { type: "string" },
						end_date: { type: "string" },
						modified_at: { type: "string" },
						todos: {
							type: "array",
							items: {
								$ref: "#components/schemas/To do",
							},
						},
					},
				},
				"To do": {
					type: "object",
					required: ["title", "description"],
					properties: {
						id: { type: "string" },
						title: { type: "string" },
						description: { type: "string" },
						created_at: { type: "string" },
						modified_at: { type: "string" },
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
