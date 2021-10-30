import { RouteShorthandOptions } from "fastify";

const authOptions: RouteShorthandOptions = {
	schema: {
		tags: ["User"],
		body: {
			type: "object",
			properties: {
				username: {
					type: "string",
				},
				email: {
					type: "string",
				},
				password: {
					type: "string",
				},
			},
		},
		response: {
			200: {
				access_token: {
					type: "string",
				},
			},
		},
	},
};

export default authOptions;
