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
		/**
		 * Hashes a string and returns a promise
		 * which resolves with the has result.
		 */
		bcryptHash: (pwd: string) => Promise<string>;

		/**
		 * Hashes data and then compares it to a hash,
		 * returns a promise that resolves with the
		 * result of the comparison.
		 */
		bcryptCompare: (data: string, hash: string) => Promise<boolean>;
	}
}