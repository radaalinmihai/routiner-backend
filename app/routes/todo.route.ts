import { FastifyInstance } from "fastify";
import authenticationMiddleware from "../middlewares/authentication";
import {
	deleteToDoHandler,
	getToDoHandler,
	insertToDoHandler,
} from "../controllers/Todo/todo.controller";
import { deleteToDoOptions, getToDoOptions, insertToDoOptions } from "../schemas/todo.schema";

export default async function todoRoutes(fastify: FastifyInstance) {
	// fastify.addHook("onRequest", authenticationMiddleware(fastify));
	fastify.post("", insertToDoOptions, insertToDoHandler);
	fastify.get("/:id", getToDoOptions, getToDoHandler);
	fastify.delete("/:id", deleteToDoOptions, deleteToDoHandler);
}
