import { FastifyInstance } from "fastify";
import authenticationMiddleware from "../middlewares/authentication";
import { getRoutine, insertRoutineHandler } from "../controllers/Routine/routine.controller";
import { getRouteOptions, insertRoutineOptions } from "../schemas/routine.schema";

export default async function routineRoutes(fastify: FastifyInstance) {
	fastify.addHook("onRequest", authenticationMiddleware(fastify));
	fastify.post("", insertRoutineOptions, insertRoutineHandler);
	fastify.get("/:routineId", getRouteOptions, getRoutine);
}
