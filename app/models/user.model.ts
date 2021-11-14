import { Static, Type } from "@sinclair/typebox";

export const UserModel = Type.Object({
	id: Type.Optional(Type.Integer()),
	userId: Type.Optional(Type.String()),
	username: Type.String(),
	email: Type.String(),
	password: Type.String(),
});

export const UserReply = Type.Object({
	access_token: Type.String(),
});

export const UserParams = Type.Object({
	userId: Type.String(),
});

export const UserRetrieve = Type.Omit(UserModel, ["password"]);

export type UserModel = Static<typeof UserModel>;
export type UserRetrieve = Static<typeof UserRetrieve>;
export type UserReply = Static<typeof UserReply>;
export type UserParams = Static<typeof UserParams>;
