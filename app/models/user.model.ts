import { Static, Type } from "@sinclair/typebox";

export const UserReturnModel = Type.Object({
	access_token: Type.String(),
});

export const UserModel = Type.Object({
	username: Type.String(),
	email: Type.String(),
	password: Type.String(),
});

export type UserBody = Static<typeof UserModel>;
export type UserReturn = Static<typeof UserReturnModel>;
