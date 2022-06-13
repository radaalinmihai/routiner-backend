import {
  ContextConfigDefault,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerBase,
  RouteHandlerMethod,
} from "fastify";

export type RouteHandler<RouteGeneric> = RouteHandlerMethod<
  RawServerBase,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  RouteGeneric,
  ContextConfigDefault
>;
