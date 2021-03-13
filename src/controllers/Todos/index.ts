import { Request, Response } from 'express';
import createTodo from './CreateTodo';

class TodoController {
  async create(request: Request, response: Response) {
    createTodo.execute(request, response);
  }
}

const todoController = new TodoController();
export default todoController;
