import { RouteHandler } from "../../types/IHandler.js";
import { InsertRoutineModel, RoutineModel, RoutineParams } from "../../models/routine.model.js";
import { TodoModel } from "../../models/todo.model.js";
import got from "got";

export const getRoutine: RouteHandler<{ Params: RoutineParams }> = async (request, reply) => {
	const { routineId } = request.params;
	const { server } = request;
	try {
		const [data] = await server.mysql.query<[RoutineModel[], TodoModel[]]>(
			`
			SELECT * FROM routines WHERE id=?;
			SELECT
			todos.id,
			todos.title,
			todos.description,
			todos.created_at,
			todos.modified_at
			FROM routines
			RIGHT JOIN todos ON routines.id=todos.routine_id
			WHERE routines.id=?;
			`,
			[routineId, routineId],
		);
		const [routines, todos] = data;
		if (!routines.length) {
			return reply.code(404).send({
				message: `No routine with id ${routineId}`,
			});
		}
		return reply.send({ ...routines[0], todos });
	} catch (err) {
		console.error(err);
		return reply.code(500).send({
			message: "Something went bad",
		});
	}
};

export const insertRoutineHandler: RouteHandler<{ Body: InsertRoutineModel }> = async (
	request,
	reply,
) => {
	const { server, body, hostname, protocol } = request;
	const { title, description, start_date, end_date, todos } = body;
	try {
		const isoStartDate = new Date(start_date).toISOString().replace(/T.+/, "");
		const isoEndDate = new Date(end_date).toISOString().replace(/T.+/, "");
		const [[, , routines]] = await server.mysql.query<[unknown, any, RoutineModel[]]>(
			`
				SET @lastId=UUID();
				INSERT INTO routines (id, title, description, start_date, end_date, created_at)
				VALUES (@lastId, ?, ?, ?, ?, NOW());
				SELECT * FROM routines WHERE id=@lastId;
			`,
			[title, description, isoStartDate, isoEndDate],
		);
		const routine = routines[0];
		if (todos?.length) {
			try {
				const todoRequests = await Promise.all(
					todos.map(async (todo) => {
						return got.post(`${protocol}://${hostname}/todo`, {
							json: { ...todo, routine_id: routine.id },
						});
					}),
				);
				server.log.info(JSON.parse(todoRequests[0].body));
			} catch (err) {
				server.log.error(err);
			}
		}
		return reply.code(200).send({ ...routine, todos: todos || [] });
	} catch (err) {
		server.log.error(err);
		return reply.code(500).send({
			message: "Something bad happened",
		});
	}
};
