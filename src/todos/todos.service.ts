import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  // Insert a new record
  async create(todo: Todo) {
    todo.updatedAt = null; // Ensure `updatedAt` starts as null
    return await this.todoRepository.save(todo);
  }
  

  // Fetch all records
  async findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  // Fetch a single record by ID
  async findOne(id: number): Promise<Todo> {
    return this.todoRepository.findOne({ where: { id } });
  }

  // Update a record by ID
  async update(id: number, todo: Partial<Todo>): Promise<Todo> {
    await this.todoRepository.update(id, todo);
    return this.findOne(id); // Return the updated record
  }

  // Delete a record by ID
  async delete(id: number): Promise<void> {
    await this.todoRepository.delete(id);
  }
}
