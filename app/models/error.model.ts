import { Static, Type } from "@sinclair/typebox";

export const ErrorModel = Type.Object({
  message: Type.String(),
});

export type ErrorModel = Static<typeof ErrorModel>;
