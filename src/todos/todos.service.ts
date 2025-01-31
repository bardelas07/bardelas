import { Injectable, NotFoundException } from '@nestjs/common';
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
    async create(todo: Todo): Promise<Todo> {
        todo.updatedAt = new Date(); // Set updated timestamp
        return await this.todoRepository.save(todo);
    }

    // Fetch all records
    async findAll(): Promise<Todo[]> {
        return await this.todoRepository.find();
    }

    // Fetch a single record by ID
    async findOne(id: number): Promise<Todo> {
        const todo = await this.todoRepository.findOne({ where: { id } });
        if (!todo) throw new NotFoundException(`Todo with ID ${id} not found`);
        return todo;
    }

    // Update a record by ID
    async update(id: number, todo: Partial<Todo>): Promise<Todo> {
        const existingTodo = await this.findOne(id);
        if (!existingTodo) throw new NotFoundException(`Todo with ID ${id} not found`);
        
        await this.todoRepository.update(id, { ...todo, updatedAt: new Date() });
        return this.findOne(id); // Return updated record
    }

    // Delete a record by ID
    async delete(id: number): Promise<void> {
        const result = await this.todoRepository.delete(id);
        if (result.affected === 0) throw new NotFoundException(`Todo with ID ${id} not found`);
    }
}
