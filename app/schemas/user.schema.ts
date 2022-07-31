import {
	ContextConfigDefault,
	RawReplyDefaultExpression,
	RawRequestDefaultExpression,
	RawServerBase,
	RouteShorthandOptions,
} from "fastify";
import { UserModel, UserParams, UserRetrieve } from "../models/user.model";
import { ErrorModel } from "../models/general.model";
import { Type } from "@sinclair/typebox";

export const getUserOptions: RouteShorthandOptions<
	RawServerBase,
	RawRequestDefaultExpression,
	RawReplyDefaultExpression,
	{ Params: UserParams },
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
	{ Params: UserParams },
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
	{ Params: UserParams; Body: Partial<UserModel> },
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
