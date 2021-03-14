import { Request, Response } from 'express';
import createTodo from './CreateTodo';
import updateTodo from './UpdateTodo';

class TodoController {
  async create(request: Request, response: Response) {
    createTodo.execute(request, response);
  }

  async update(request: Request, response: Response) {
    updateTodo.execute(request, response);
  }
}

const todoController = new TodoController();
export default todoController;
