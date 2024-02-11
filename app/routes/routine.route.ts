import { FastifyInstance } from "fastify";
import authenticationMiddleware from "../middlewares/authentication.js";
import {
	deleteRoutine,
	getRoutine,
	insertRoutineHandler,
} from "../controllers/Routine/routine.controller.js";
import {
	deleteRouteOptions,
	getRouteOptions,
	insertRoutineOptions,
} from "../schemas/routine.schema.js";

export default async function routineRoutes(fastify: FastifyInstance) {
	fastify.addHook("onRequest", authenticationMiddleware(fastify));
	fastify.post("", insertRoutineOptions, insertRoutineHandler);
	fastify.get("/:routineId", getRouteOptions, getRoutine);
	fastify.delete("/:routineId", deleteRouteOptions, deleteRoutine);
}
