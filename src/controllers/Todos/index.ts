import { Request, Response } from 'express';
import createTodo from './CreateTodo';
import updateTodo from './UpdateTodo';
import listTodo from './ListTodos';
import deleteTodo from './DeleteTodo';

class TodoController {
  async create(request: Request, response: Response) {
    createTodo.execute(request, response);
  }

  async update(request: Request, response: Response) {
    updateTodo.execute(request, response);
  }

  async list(request: Request, response: Response) {
    listTodo.execute(request, response);
  }

  async delete(request: Request, response: Response) {
    deleteTodo.execute(request, response);
  }
}

const todoController = new TodoController();
export default todoController;
