import { RouteHandler } from "../../types/IHandler";
import { InsertRoutineModel, RoutineModel, RoutineParams } from "../../models/routine.model";
import { TodoModel } from "../../models/todo.model";

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
	const { server, body } = request;
	const { title, description, start_date, end_date } = body;
	try {
		const isoStartDate = new Date(start_date).toISOString().replace(/T.+/, "");
		const isoEndDate = new Date(end_date).toISOString().replace(/T.+/, "");
		const [[, , routines]] = await server.mysql.query<[any, any, RoutineModel[]]>(
			`
				SET @lastId=UUID();
				INSERT INTO routines (id, title, description, start_date, end_date, created_at)
				VALUES (@lastId, ?, ?, ?, ?, NOW());
				SELECT * FROM routines WHERE id=@lastId;
			`.replace(/\n\t/gm, ""),
			[title, description, isoStartDate, isoEndDate],
		);
		server.log.info(routines);
		return reply.code(200).send(routines[0]);
	} catch (err) {
		server.log.error(err);
		return reply.code(500).send({
			message: "Something bad happened",
		});
	}
};
