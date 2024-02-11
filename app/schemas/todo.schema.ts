import {
	ContextConfigDefault,
	RawReplyDefaultExpression,
	RawRequestDefaultExpression,
	RawServerBase,
	RouteShorthandOptions,
} from "fastify";
import { InsertToDoModel, TodoModel, ToDoParams } from "../models/todo.model.js";
import { ErrorModel, SuccessModel } from "../models/general.model.js";

export const getToDoOptions: RouteShorthandOptions<
	RawServerBase,
	RawRequestDefaultExpression,
	RawReplyDefaultExpression,
	{ Params: ToDoParams },
	ContextConfigDefault
> = {
	schema: {
		tags: ["To do"],
		security: [
			{
				bearerAuth: [],
			},
		],
		params: {
			id: { type: "string" },
		},
		response: {
			200: TodoModel,
			404: ErrorModel,
			400: ErrorModel,
			500: ErrorModel,
		},
	},
};

export const insertToDoOptions: RouteShorthandOptions<
	RawServerBase,
	RawRequestDefaultExpression,
	RawReplyDefaultExpression,
	{ Body: InsertToDoModel },
	ContextConfigDefault
> = {
	schema: {
		tags: ["To do"],
		security: [
			{
				bearerAuth: [],
			},
		],
		body: InsertToDoModel,
		response: {
			200: TodoModel,
			404: ErrorModel,
			400: ErrorModel,
			500: ErrorModel,
		},
	},
};

export const deleteToDoOptions: RouteShorthandOptions<
	RawServerBase,
	RawRequestDefaultExpression,
	RawReplyDefaultExpression,
	any,
	ContextConfigDefault
> = {
	schema: {
		tags: ["To do"],
		security: [
			{
				bearerAuth: [],
			},
		],
		response: {
			200: SuccessModel,
			404: ErrorModel,
			400: ErrorModel,
			500: ErrorModel,
		},
	},
};
