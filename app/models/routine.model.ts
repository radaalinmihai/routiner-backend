import { Static, Type } from "@sinclair/typebox";
import { RowDataPacket } from "mysql2";
import { TodoModel } from "./todo.model";

export const RoutineModel = Type.Object({
	id: Type.String(),
	title: Type.String(),
	description: Type.Optional(Type.String()),
	created_at: Type.String(),
	start_date: Type.String(),
	end_date: Type.String(),
	modified_at: Type.String(),
	todos: Type.Array(TodoModel),
});

export const InsertRoutineModel = Type.Pick(RoutineModel, [
	"title",
	"description",
	"start_date",
	"end_date",
]);

export const RoutineParams = Type.Object({
	routineId: Type.String(),
});

export type RoutineModel = Static<typeof RoutineModel> & RowDataPacket;
export type InsertRoutineModel = Static<typeof InsertRoutineModel> & RowDataPacket;
export type RoutineParams = Static<typeof RoutineParams>;
