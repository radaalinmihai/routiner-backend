import build from "./main.js";

const server = build({
	logger: {
		level: "info",
		transport: {
			target: "pino-pretty",
			options: {
				translateTime: "HH:MM:ss Z",
				ignore: "pid,hostname",
			},
		},
	},
});

const start = async () => {
	try {
		await server.listen({
			port: 4000,
		});
		server.blipp();
		server.swagger();
	} catch (err) {
		server.log.error(err);
		process.exit(1);
	}
};

start();
