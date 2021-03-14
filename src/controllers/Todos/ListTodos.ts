import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import TodosRepository from '../../repositories/TodosRepository';

class ListTodos {
  async execute(request: Request, response: Response) {
    const { id } = request.params;
    const todosRepository = getCustomRepository(TodosRepository);

    const todos = await todosRepository.find({ userId: id });

    return response.json(todos);
  }
}
const listTodos = new ListTodos();
export default listTodos;
