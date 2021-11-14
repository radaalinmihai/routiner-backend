import { FastifyPluginCallback } from "fastify";
import bcrypt from "bcryptjs";
import fp from "fastify-plugin";
import IBcrypt from "../types/IBcrypt";

const bcryptPlugin: FastifyPluginCallback<IBcrypt> = function (
	fastify,
	options,
	done,
) {
	const saltWorkFactor = options?.saltWorkFactor || 10;

	const hash = async (pwd: string) => bcrypt.hash(pwd, saltWorkFactor);

	const compare = async (claim1: string, claim2: string) =>
		bcrypt.compare(claim1, claim2);

	fastify
		.decorate("bcrypt", {
			hash,
			compare,
		})
		.decorateRequest("bcryptHash", hash)
		.decorateRequest("bcryptCompare", compare);
	done();
};

export default fp(bcryptPlugin, {
	name: "fastify-bcrypt",
	fastify: "3.x.x",
});
