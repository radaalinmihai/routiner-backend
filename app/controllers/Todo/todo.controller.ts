import { RouteHandler } from "../../types/IHandler.js";
import { InsertToDoModel, TodoModel, ToDoParams } from "../../models/todo.model.js";
import { ResponseCodes } from "../../models/general.model.js";
import { ResultSetHeader } from "mysql2";

export const getToDoHandler: RouteHandler<{ Params: ToDoParams }> = async (request, reply) => {
	const { server } = request;
	const { id } = request.params;

	if (!id) {
		return reply.code(400).send({
			message: "'id' field must be a string.",
		});
	}

	const [todoItems] = await server.mysql.query<TodoModel[]>("SELECT * FROM `todos` WHERE `id`=?", [
		id,
	]);
	if (!todoItems.length) {
		return reply.code(404).send({
			message: `No to do item with id ${id} found.`,
		});
	}
	return reply.send(todoItems[0]);
};

export const insertToDoHandler: RouteHandler<{ Body: InsertToDoModel }> = async (
	request,
	reply,
) => {
	const { server, body } = request;
	const { title, description, routine_id } = body;
	try {
		const [[, , toDo]] = await server.mysql.query<[any, any, TodoModel[]]>(
			`
			SET @lastId=UUID(); 
			INSERT INTO todos (id, title, description, created_at, routine_id) 
			VALUES(@lastId, ?, ?, NOW(), ?)); 
			SELECT * FROM todos WHERE id=@lastId;
			`,
			[title, description, routine_id],
		);
		return reply.code(200).send(toDo[0]);
	} catch (err) {
		server.log.error(err);
		return reply.code(500).send({
			message: "Something bad happened",
		});
	}
};

export const deleteToDoHandler: RouteHandler<{ Params: ToDoParams }> = async (request, reply) => {
	const { server, params } = request;
	const { id } = params;
	if (!id) {
		return reply.code(400).send({
			message: "id parameter is missing",
		});
	}
	try {
		const [info] = await server.mysql.query<ResultSetHeader>("DELETE FROM todos WHERE `id`=?", [
			id,
		]);
		if (!info.affectedRows) {
			return reply.code(404).send({
				message: `No TODO found with id '${id}' found.`,
			});
		}
		return reply.code(200).send({
			status: ResponseCodes.OK,
			message: "Successfully deleted TODO",
		});
	} catch (err) {
		return reply.code(500).send({
			message: "Something bad happened",
		});
	}
};
