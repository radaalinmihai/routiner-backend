import {
	ContextConfigDefault,
	RawReplyDefaultExpression,
	RawRequestDefaultExpression,
	RawServerBase,
	RouteShorthandOptions,
} from "fastify";
import {
	DeleteRoutineModel,
	InsertRoutineModel,
	RoutineModel,
	RoutineParams,
} from "../models/routine.model.js";
import { ErrorModel, SuccessModel } from "../models/general.model.js";

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

export const deleteRouteOptions: RouteShorthandOptions<
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
		body: DeleteRoutineModel,
		response: {
			200: SuccessModel,
			404: ErrorModel,
		},
	},
};
