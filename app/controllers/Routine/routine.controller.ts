import { RouteHandler } from "../../types/IHandler.js";
import {
	DeleteRoutineModel,
	InsertRoutineModel,
	RoutineModel,
	RoutineParams,
} from "../../models/routine.model.js";
import { TodoModel } from "../../models/todo.model.js";
import { ResponseCodes } from "../../models/general.model.js";
import {
	DELETE_ROUTINE_QUERY,
	DELETE_ROUTINE_TODOS_QUERY,
	GET_ROUTINE_QUERY,
} from "../../common/queries.js";

export const getRoutine: RouteHandler<{ Params: RoutineParams }> = async (request, reply) => {
	const { routineId } = request.params;
	const { server } = request;
	try {
		const routines = await server.pg.query<RoutineModel[]>(GET_ROUTINE_QUERY, [routineId]);
		if (!routines.rows.length) {
			return reply.code(404).send({
				message: `No routine with id ${routineId}`,
			});
		}
		return reply.send(routines.rows[0]);
	} catch (err) {
		server.log.error(err);
		return reply.code(500).send({
			message: "Something went bad",
		});
	}
};

export const insertRoutineHandler: RouteHandler<{ Body: InsertRoutineModel }> = async (
	request,
	reply,
) => {
	const { server, body, user } = request;
	const { title, description, start_date, end_date, todos } = body;
	try {
		const isoStartDate = new Date(start_date).toISOString().replace(/T.+/, "");
		const isoEndDate = new Date(end_date).toISOString().replace(/T.+/, "");
		const routine = await server.pg.transact<RoutineModel>(async (client) => {
			const _routine = await client.query<RoutineModel>(
				`INSERT INTO routines(title, description, start_date, end_date, created_at, created_by) VALUES($1, $2, $3, $4, NOW(), $5) RETURNING *`,
				[title, description, isoStartDate, isoEndDate, user.userId],
			);
			if (todos?.length) {
				_routine.rows[0].todos = await Promise.all<TodoModel>(
					todos.map<Promise<TodoModel>>(async (todo) => {
						const _todo = await client.query<TodoModel>(
							`INSERT INTO todos (title, description) VALUES($1, $2) RETURNING *`,
							[todo.title, todo.description],
						);
						await client.query(`INSERT INTO routines_todos VALUES ($1, $2)`, [
							_routine.rows[0].id,
							_todo.rows[0].id,
						]);
						return _todo.rows[0];
					}),
				);
			}

			return _routine.rows[0];
		});
		return reply.code(200).send(routine);
	} catch (err) {
		server.log.error(err);
		return reply.code(500).send({
			message: "Something bad happened",
		});
	}
};

export const deleteRoutine: RouteHandler<{
	Params: RoutineParams;
	Body: DeleteRoutineModel;
}> = async (request, reply) => {
	const { body, params, user, server } = request;
	const data = await server.pg.query(DELETE_ROUTINE_QUERY, [params.routineId, user.userId]);
	if (body?.deleteTodos) {
		await server.pg.query(DELETE_ROUTINE_TODOS_QUERY, [params.routineId]);
	}
	return reply.code(200).send({
		status: ResponseCodes.OK,
		message: data.rowCount
			? "Routine removed successfully"
			: `No routine with id ${params.routineId} found. Nothing has changed`,
	});
};
