import {
	ContextConfigDefault,
	RawReplyDefaultExpression,
	RawRequestDefaultExpression,
	RawServerBase,
	RouteGenericInterface,
	RouteHandlerMethod,
} from "fastify";

export type RouteHandler<RouteGeneric extends RouteGenericInterface = RouteGenericInterface> =
	RouteHandlerMethod<
		RawServerBase,
		RawRequestDefaultExpression,
		RawReplyDefaultExpression,
		RouteGeneric,
		ContextConfigDefault
	>;
