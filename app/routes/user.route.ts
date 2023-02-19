import { FastifyInstance } from "fastify";
import {
	deleteUserHandler,
	getUserHandler,
	patchUserHandler,
} from "../controllers/User/user.controller.js";
import { getUserOptions, deleteUserOptions, patchUserOptions } from "../schemas/user.schema.js";
import authenticationMiddleware from "../middlewares/authentication.js";

export default async function userRoutes(fastify: FastifyInstance) {
	fastify.addHook("onRequest", authenticationMiddleware(fastify));
	fastify.get("/:id", getUserOptions, getUserHandler);
	fastify.patch("/:id", patchUserOptions, patchUserHandler);
	fastify.delete("/:id", deleteUserOptions, deleteUserHandler);
}
