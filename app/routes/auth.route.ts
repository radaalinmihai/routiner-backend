import { FastifyInstance } from "fastify";
import authOptions from "../schemas/auth.schema";
import { UserModel, UserReply } from "../models/user.model";
import {
	loginHandler,
	registerHandler,
} from "../controllers/User/user.controller";

async function authRoutes(fastify: FastifyInstance) {
	fastify.post<{ Body: UserModel; Reply: UserReply }>(
		"/login",
		authOptions,
		loginHandler,
	);

	fastify.post<{ Body: UserModel; Reply: UserReply }>(
		"/register",
		authOptions,
		registerHandler,
	);
}

export default authRoutes;
