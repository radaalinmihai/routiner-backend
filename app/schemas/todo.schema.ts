import {
	ContextConfigDefault,
	RawReplyDefaultExpression,
	RawRequestDefaultExpression,
	RawServerBase,
	RouteShorthandOptions,
} from "fastify";
import { TodoModel, ToDoParams } from "../models/todo.model";
import { ErrorModel } from "../models/error.model";

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
		},
	},
};
