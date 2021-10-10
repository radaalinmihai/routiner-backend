import {IDotEnv} from "./types/IRoutinerDB";
import {MySQLPromiseConnection} from "fastify-mysql";

declare module 'fastify' {
	interface FastifyInstance {
		environmentConfiguration: IDotEnv;
		mysql: MySQLPromiseConnection;
	}
}
