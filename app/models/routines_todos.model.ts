import { Static, Type } from "@sinclair/typebox";
import { RowDataPacket } from "mysql2";

export const RoutinesTodosModel = Type.Object({
	routine_id: Type.String(),
	todo_id: Type.String(),
});

export type RoutinesTodoModel = Static<typeof RoutinesTodosModel> & RowDataPacket;
