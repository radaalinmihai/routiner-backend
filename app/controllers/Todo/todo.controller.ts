import { RouteHandler } from "../../types/IHandler";
import { TodoModel, ToDoParams } from "../../models/todo.model";

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
