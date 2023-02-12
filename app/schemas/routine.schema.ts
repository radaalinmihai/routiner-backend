import {
	ContextConfigDefault,
	RawReplyDefaultExpression,
	RawRequestDefaultExpression,
	RawServerBase,
	RouteShorthandOptions,
} from "fastify";
import { InsertRoutineModel, RoutineModel, RoutineParams } from "../models/routine.model";
import { ErrorModel } from "../models/general.model";
import { RouteGenericInterface } from "fastify/types/route";

export const insertRoutineOptions: RouteShorthandOptions<
	RawServerBase,
	RawRequestDefaultExpression,
	RawReplyDefaultExpression,
	{ Body: InsertRoutineModel },
	ContextConfigDefault
> = {
	schema: {
		tags: ["Routine"],
		security: [
			{
				bearerAuth: [],
			},
		],
		body: InsertRoutineModel,
		response: {
			200: RoutineModel,
			404: ErrorModel,
			400: ErrorModel,
			500: ErrorModel,
		},
	},
};

export const getRouteOptions: RouteShorthandOptions<
	RawServerBase,
	RawRequestDefaultExpression,
	RawReplyDefaultExpression,
	{ Params: RoutineParams },
	ContextConfigDefault
> = {
	schema: {
		tags: ["Routine"],
		security: [
			{
				bearerAuth: [],
			},
		],
		params: {
			routineId: {
				type: "string",
			},
		},
		response: {
			200: RoutineModel,
			404: ErrorModel,
		},
	},
};