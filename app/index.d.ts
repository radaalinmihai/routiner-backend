import {IDotEnv} from "./types/IRoutinerDB";

declare module 'fastify' {
	interface FastifyInstance {
		environmentConfiguration: IDotEnv;
	}
}
