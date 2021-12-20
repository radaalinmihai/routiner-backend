import {
	ContextConfigDefault,
	RawReplyDefaultExpression,
	RawRequestDefaultExpression,
	RawServerBase,
	RouteShorthandOptions,
} from "fastify";
import { UserParams, UserRetrieve } from "../models/user.model";

const userOptions: RouteShorthandOptions<
	RawServerBase,
	RawRequestDefaultExpression,
	RawReplyDefaultExpression,
	{ Reply: UserRetrieve; Params: UserParams },
	ContextConfigDefault
> = {
	schema: {
		tags: ["User"],
		querystring: {
			id: { type: "string" },
		},
		response: {
			200: UserRetrieve,
		},
	},
};

export default userOptions;
