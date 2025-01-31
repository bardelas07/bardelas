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

    // Insert a new record with updatedAt as null
    async create(todo: Todo): Promise<Todo> {
        todo.updatedAt = null; // Ensure updatedAt is empty on creation
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

    // Update a record by ID, setting updatedAt only if updating
    async update(id: number, todo: Partial<Todo>): Promise<Todo> {
        const existingTodo = await this.findOne(id);
        if (!existingTodo) throw new NotFoundException(`Todo with ID ${id} not found`);
        
        todo.updatedAt = new Date(); // Set updatedAt only when updating
        
        await this.todoRepository.update(id, todo);
        return this.findOne(id); // Return updated record
    }

    // Delete a record by ID
    async delete(id: number): Promise<void> {
        const result = await this.todoRepository.delete(id);
        if (result.affected === 0) throw new NotFoundException(`Todo with ID ${id} not found`);
    }
}
