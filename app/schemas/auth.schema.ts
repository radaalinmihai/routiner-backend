import { RouteShorthandOptions } from "fastify";
import { UserReply } from "../models/user.model.js";

const authOptions: RouteShorthandOptions = {
	schema: {
		tags: ["Auth"],
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
			200: UserReply,
		},
	},
};

export default authOptions;
