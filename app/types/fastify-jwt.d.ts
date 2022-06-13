import "@fastify/jwt";
import { UserJWT } from "../models/user.model";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: {
      userId: string;
      username: string;
      email: string;
    }; // payload type is used for signing and verifying
    user: UserJWT; // user type is return type of `request.user` object
  }
}
