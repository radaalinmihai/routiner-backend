import { FastifyInstance } from "fastify";
import authOptions from "../schemas/auth.schema";
import { UserBody, UserReturn } from "../models/user.model";
import {
	loginHandler,
	registerHandler,
} from "../controllers/User/user.controller";

async function authRoutes(fastify: FastifyInstance) {
	fastify.post<{ Body: UserBody; Reply: UserReturn }>(
		"/login",
		authOptions,
		loginHandler,
	);

	fastify.post<{ Body: UserBody; Reply: UserReturn }>(
		"/register",
		authOptions,
		registerHandler,
	);
}

export default authRoutes;
