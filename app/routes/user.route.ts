import { FastifyInstance } from "fastify";
import { getUserHandler } from "../controllers/User/user.controller";
import userOptions from "../schemas/user.schema";
import { UserParams, UserRetrieve } from "../models/user.model";

export default async function userRoutes(fastify: FastifyInstance) {
	fastify.get<{
		Reply: UserRetrieve;
		Params: UserParams;
	}>("/user/:id", userOptions, getUserHandler);
}
