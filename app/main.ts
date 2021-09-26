import fastify from "fastify";
import fastifyBlipp from "fastify-blipp";
import routes from "./routes/auth";
import dotenv from "./plugins/dotenv";

const server = fastify();

server.register(fastifyBlipp);
server.register(dotenv);
server.register(routes);

const start = async () => {
	try {
		await server.listen(3000);

		server.blipp();
	} catch(err) {
		server.log.error(err);
		process.exit(1);
	}
}

start();
