import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './entities/todo.entity';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  // POST endpoint to insert data
  @Post()
  async create(@Body() todo: Todo): Promise<Todo> {
    return this.todosService.create(todo);
  }

  // GET endpoint to fetch all records
  @Get()
  async findAll(): Promise<Todo[]> {
    return this.todosService.findAll();
  }

  // GET endpoint to fetch a record by ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Todo> {
    return this.todosService.findOne(id);
  }
}
