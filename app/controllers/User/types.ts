import {
	ContextConfigDefault,
	RawReplyDefaultExpression,
	RawRequestDefaultExpression,
	RawServerDefault,
	RouteHandlerMethod,
} from "fastify";
import { UserBody, UserReturn } from "../../models/user.model";

export default interface UserTypes {
	login: RouteHandlerMethod<
		RawServerDefault,
		RawRequestDefaultExpression,
		RawReplyDefaultExpression,
		{ Body: UserBody; Reply: UserReturn },
		ContextConfigDefault
	>;
}
