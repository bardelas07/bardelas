import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './entities/todo.entity';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() todo: Todo) {
    return this.todosService.create(todo);
  }

  @Get()
  findAll() {
    return this.todosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.todosService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() todo: Partial<Todo>) {
    return this.todosService.update(id, todo);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.todosService.delete(id);
  }
}
