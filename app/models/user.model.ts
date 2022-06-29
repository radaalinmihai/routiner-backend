import { Static, Type } from "@sinclair/typebox";
import { RowDataPacket } from "mysql2";

export const UserModel = Type.Object({
	id: Type.Optional(Type.Integer()),
	userId: Type.String(),
	username: Type.String(),
	email: Type.String(),
	password: Type.String(),
});

export const UserReply = Type.Object({
	access_token: Type.Optional(Type.String()),
	message: Type.String(),
});

export const UserParams = Type.Object({
	id: Type.String(),
});

export const UserRetrieve = Type.Omit(UserModel, ["password"]);

export type UserModel = Static<typeof UserModel> & RowDataPacket;
export type UserRetrieve = Static<typeof UserRetrieve> & RowDataPacket;
export type UserReply = Static<typeof UserReply>;
export type UserParams = Static<typeof UserParams>;
export type UserJWT = {
	email?: string | null;
	userId: string;
	username: string;
	iat: number;
	exp: number;
};
