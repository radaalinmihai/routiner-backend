import { Static, Type } from "@sinclair/typebox";
import { RowDataPacket } from "mysql2";

export const TodoModel = Type.Object({
	id: Type.String(),
	title: Type.String(),
	description: Type.Optional(Type.String()),
	created_at: Type.String(),
	modified_at: Type.String(),
});

export const ToDoParams = Type.Object({
	id: Type.String(),
});

export type TodoModel = Static<typeof TodoModel> & RowDataPacket;
export type ToDoParams = Static<typeof ToDoParams>;
