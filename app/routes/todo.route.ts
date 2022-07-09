import { FastifyInstance } from "fastify";
import authenticationMiddleware from "../middlewares/authentication";
import { getToDoHandler } from "../controllers/Todo/todo.controller";
import { getToDoOptions } from "../schemas/todo.schema";

export default async function todoRoutes(fastify: FastifyInstance) {
	// fastify.addHook("onRequest", authenticationMiddleware(fastify));
	fastify.get("/:id", getToDoOptions, getToDoHandler);
}
