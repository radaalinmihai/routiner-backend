import { IDotEnv } from "./IRoutinerDB";
import { MySQLPromiseConnection } from "fastify-mysql";
import User from "../controllers/User/user.controller";

declare module "fastify" {
	interface FastifyInstance {
		environmentConfiguration: IDotEnv;
		mysql: MySQLPromiseConnection;
		user: typeof User;
		bcrypt: {
			hash: (pwd: string) => Promise<string>;
			compare: (data: string, hash: string) => Promise<boolean>;
		};
	}

	interface FastifyRequest {
		bcryptHash: (pwd: string) => Promise<string>;
		bcryptCompare: (data: string, hash: string) => Promise<boolean>;
	}
}
