import { Static, Type } from "@sinclair/typebox";

export enum ResponseCodes {
	OK = "OK",
	MISSING_FEATURE = "MISSING_FEATURE",
	MISSING_ID = "MISSING_ID",
	SERVER_ERROR = "SERVER_ERROR",
}

export const ErrorModel = Type.Object({
	message: Type.String(),
});

export const SuccessModel = Type.Object({
	status: Type.Enum(ResponseCodes),
	message: Type.String(),
});

export type ErrorModel = Static<typeof ErrorModel>;
export type SuccessModel = Static<typeof SuccessModel>;
