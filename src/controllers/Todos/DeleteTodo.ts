import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import TodosRepository from '../../repositories/TodosRepository';

class DeleteTodo {
  async execute(request: Request, response: Response) {
    const { id } = request;
    const { todoId } = request.params;

    const todosRepository = getCustomRepository(TodosRepository);
    const todo = await todosRepository.findOne({ id: todoId });
    if (!todo) {
      return response.status(404).json({ mesage: 'Todo not found' });
    }
    if (todo.userId === id) {
      todosRepository.delete({ id: todoId });
      return response.send();
    }
    return response.status(400).json({ message: 'You are not the owner of this todo' });
  }
}
const deleteTodo = new DeleteTodo();
export default deleteTodo;
