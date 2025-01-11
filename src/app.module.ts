import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306, // Default MySQL port
      username: 'root', // Your MySQL username
      password: '', // Your MySQL password (leave empty if not set)
      database: 'student', // Replace with your database name
      autoLoadEntities: true, // Automatically load entities
      synchronize: true, // Set to false in production (auto-creates tables)
    }),
    TodosModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
