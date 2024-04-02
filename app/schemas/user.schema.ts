import {
	ContextConfigDefault,
	RawReplyDefaultExpression,
	RawRequestDefaultExpression,
	RawServerBase,
	RouteGenericInterface,
	RouteShorthandOptions,
} from "fastify";
import { UserModel, UserRetrieve } from "../models/user.model.js";
import { ErrorModel } from "../models/general.model.js";
import { Type } from "@sinclair/typebox";
import { RoutineModel } from "../models/routine.model.js";

export const getUserOptions: RouteShorthandOptions<
	RawServerBase,
	RawRequestDefaultExpression,
	RawReplyDefaultExpression,
	RouteGenericInterface,
	ContextConfigDefault
> = {
	schema: {
		tags: ["User"],
		security: [
			{
				bearerAuth: [],
			},
		],
		params: {
			id: { type: "string" },
		},
		response: {
			200: UserRetrieve,
			404: ErrorModel,
		},
	},
};

export const deleteUserOptions: RouteShorthandOptions<
	RawServerBase,
	RawRequestDefaultExpression,
	RawReplyDefaultExpression,
	RouteGenericInterface,
	ContextConfigDefault
> = {
	schema: {
		tags: ["User"],
		params: {
			id: { type: "string" },
		},
		security: [
			{
				bearerAuth: [],
			},
		],
	},
};

export const patchUserOptions: RouteShorthandOptions<
	RawServerBase,
	RawRequestDefaultExpression,
	RawReplyDefaultExpression,
	{ Body: Partial<UserModel> },
	ContextConfigDefault
> = {
	schema: {
		tags: ["User"],
		security: [
			{
				bearerAuth: [],
			},
		],
		params: {
			id: { type: "string" },
		},
		body: Type.Partial(UserModel),
		response: {
			200: UserRetrieve,
			400: ErrorModel,
		},
	},
};

export const getUserRoutinesOptions: RouteShorthandOptions<
	RawServerBase,
	RawRequestDefaultExpression,
	RawReplyDefaultExpression,
	never,
	ContextConfigDefault
> = {
	schema: {
		tags: ["User"],
		security: [
			{
				bearerAuth: [],
			},
		],
		response: {
			// 200: RoutineModel,
			400: ErrorModel,
		},
	},
};
