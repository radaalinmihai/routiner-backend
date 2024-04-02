import { FastifyInstance } from "fastify";
import {
	deleteUserHandler,
	getUserHandler, getUserRoutines,
	patchUserHandler,
} from "../controllers/User/user.controller.js";
import { getUserOptions, deleteUserOptions, patchUserOptions, getUserRoutinesOptions } from "../schemas/user.schema.js";
import authenticationMiddleware from "../middlewares/authentication.js";

export default async function userRoutes(fastify: FastifyInstance) {
	fastify.addHook("onRequest", authenticationMiddleware(fastify));
	fastify.get("/profile", getUserOptions, getUserHandler);
	fastify.patch("/profile", patchUserOptions, patchUserHandler);
	fastify.get("/routines", getUserRoutinesOptions, getUserRoutines);
	fastify.delete("/close", deleteUserOptions, deleteUserHandler);
}
