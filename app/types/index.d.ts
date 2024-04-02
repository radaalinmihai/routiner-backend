import { IDotEnv } from "./IRoutinerDB";
import { Pool } from "@types/pg";
import User from "../controllers/User/user.controller";

declare module "fastify" {
	interface FastifyInstance {
		environmentConfiguration: IDotEnv;
		pg: Pool;
		user: typeof User;
	}
}
