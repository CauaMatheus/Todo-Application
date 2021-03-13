import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import TodosRepository from '../../repositories/TodosRepository';
import UserRepository from '../../repositories/UserRepository';

class CreateTodo {
  async execute(request: Request, response: Response) {
    const { userId } = request;
    const usersRepository = getCustomRepository(UserRepository);
    const todosRepository = getCustomRepository(TodosRepository);
    const user = await usersRepository.findOne({ _id: userId });
    const todosList = await todosRepository.find({ userId: user?.id });

    if (!user) {
      return response.status(404).json({ message: 'User not found' });
    }
    if (!(todosList.length < 10) && !user?.pro) {
      return response.status(400).json({ message: 'User already have 10 todos and do not have pro' });
    }
    const { title, description, deadline } = request.body;

    const deadlineDate = new Date(`${deadline} 00:00`);

    const todo = todosRepository.create({
      title, description, userId: user.id, deadline: deadlineDate,
    });
    await todosRepository.save(todo);

    return response.status(201).json(todo);
  }
}
const createTodo = new CreateTodo();
export default createTodo;
