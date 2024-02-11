import { FastifyInstance } from "fastify";
import authenticationMiddleware from "../middlewares/authentication.js";
import {
	deleteToDoHandler,
	getToDoHandler,
	insertToDoHandler,
} from "../controllers/Todo/todo.controller.js";
import { deleteToDoOptions, getToDoOptions, insertToDoOptions } from "../schemas/todo.schema.js";

export default async function todoRoutes(fastify: FastifyInstance) {
	fastify.addHook("onRequest", authenticationMiddleware(fastify));
	fastify.post("", insertToDoOptions, insertToDoHandler);
	fastify.get("/:id", getToDoOptions, getToDoHandler);
	fastify.delete("/:id", deleteToDoOptions, deleteToDoHandler);
}
