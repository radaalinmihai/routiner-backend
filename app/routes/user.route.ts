import { FastifyInstance } from "fastify";
import {
	deleteUserHandler,
	getUserHandler,
	patchUserHandler,
} from "../controllers/User/user.controller";
import {
	getUserOptions,
	deleteUserOptions,
	patchUserOptions,
} from "../schemas/user.schema";
import authenticationMiddleware from "../middlewares/authentication";

export default async function userRoutes(fastify: FastifyInstance) {
	fastify.addHook("onRequest", authenticationMiddleware(fastify));
	fastify.get("/:id", getUserOptions, getUserHandler);
	fastify.patch("/:id", patchUserOptions, patchUserHandler);
	fastify.delete("/:id", deleteUserOptions, deleteUserHandler);
}
