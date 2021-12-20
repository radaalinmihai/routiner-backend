import build from "./main";

const server = build({
	logger: {
		level: "info",
		prettyPrint: true,
	},
});

const start = async () => {
	try {
		await server.listen(3000);
		server.blipp();
		server.swagger();
	} catch (err) {
		server.log.error(err);
		process.exit(1);
	}
};

start();
