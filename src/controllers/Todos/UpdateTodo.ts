import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import TodosRepository from '../../repositories/TodosRepository';

class UpdateTodo {
  async execute(request: Request, response: Response) {
    const { id } = request;
    const { todoId } = request.params;
    if (!todoId) {
      return response.json({ message: 'TodoId is required' });
    }
    const todosRepository = getCustomRepository(TodosRepository);

    const todo = await todosRepository.findOne({ id: todoId });
    if (!todo) {
      return response.status(404).json({ message: 'Todo not found' });
    }
    const { title, description, deadline } = request.body;
    let newDeadline;
    if (deadline) {
      newDeadline = new Date(`${deadline} 00:00`);
    }
    if (todo.userId === id) {
      todosRepository.update({ id: todoId }, {
        title: title || todo.title,
        description: description || todo.description,
        deadline: newDeadline || todo.deadline,
      });
      return response.send();
    }
    return response.status(400).json({ message: 'You are not the owner of this todo' });
  }
}
const updateTodo = new UpdateTodo();
export default updateTodo;
