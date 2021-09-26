import {FastifyInstance, FastifyRegisterOptions} from "fastify";
import fp from "fastify-plugin";

async function routes (fastify: FastifyInstance, options: FastifyRegisterOptions<FastifyInstance>) {
	fastify.get("/", (req, reply) => {
		reply.send(fastify.environmentConfiguration);
	});
}

export default fp(routes, {
	name: 'routes'
});
