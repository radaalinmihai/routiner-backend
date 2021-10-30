import { IDotEnv } from "./types/IRoutinerDB";
import { MySQLPromiseConnection } from "fastify-mysql";
import User from "./controllers/User/user.controller";

declare module "fastify" {
	interface FastifyInstance {
		environmentConfiguration: IDotEnv;
		mysql: MySQLPromiseConnection;
		user: typeof User;
	}
}
