import fastify from "fastify";
import fastifyBlipp from "fastify-blipp";
import routes from "./routes/auth";
import dotenv from "./plugins/dotenv";
import mysqlInstance from "./plugins/mysql";

const server = fastify({
	logger: {
		prettyPrint: true,
	}
});

server.register(fastifyBlipp);
server.register(dotenv);
server.register(mysqlInstance);
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
