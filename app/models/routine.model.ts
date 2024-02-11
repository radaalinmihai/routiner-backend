import { Static, Type } from "@sinclair/typebox";
import { RowDataPacket } from "mysql2";
import { TodoModel } from "./todo.model.js";
import { Nullable } from "../common/Nullable.js";

// TODO Make models for inserting and a base model
export const RoutineTodo = TodoModel;

export const RoutineModel = Type.Object({
	id: Type.String(),
	title: Type.String(),
	description: Type.Optional(Type.String()),
	created_at: Type.String(),
	start_date: Type.String(),
	end_date: Type.String(),
	modified_at: Type.String(),
	todos: Type.Optional(Type.Array(Type.Omit(TodoModel, ["id", "created_at", "modified_at"]))),
});

export const InsertRoutineModel = Type.Pick(RoutineModel, [
	"title",
	"description",
	"start_date",
	"end_date",
	"todos",
]);

export const DeleteRoutineModel = Nullable(
	Type.Object({
		deleteTodos: Type.Optional(Type.Boolean({ default: false })),
	}),
);

export const RoutineParams = Type.Object({
	routineId: Type.String(),
});

export type RoutineModel = Static<typeof RoutineModel> & RowDataPacket;
export type InsertRoutineModel = Static<typeof InsertRoutineModel> & RowDataPacket;
export type RoutineParams = Static<typeof RoutineParams>;
export type DeleteRoutineModel = Static<typeof DeleteRoutineModel>;
