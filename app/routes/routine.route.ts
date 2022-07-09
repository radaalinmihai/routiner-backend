import { FastifyInstance } from "fastify";
import authenticationMiddleware from "../middlewares/authentication";
import { getRoutine } from "../controllers/Routine/routine.controller";

export default async function routineRoutes(fastify: FastifyInstance) {
	fastify.addHook("onRequest", authenticationMiddleware(fastify));
	fastify.get("/:routineId", getRoutine);
}
