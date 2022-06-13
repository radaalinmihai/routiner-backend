import {
  ContextConfigDefault,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandlerMethod,
} from "fastify";
import { UserModel, UserReply } from "../../models/user.model";

export default interface UserTypes {
  login: RouteHandlerMethod<
    RawServerDefault,
    RawRequestDefaultExpression,
    RawReplyDefaultExpression,
    { Body: UserModel; Reply: UserReply },
    ContextConfigDefault
  >;
}
