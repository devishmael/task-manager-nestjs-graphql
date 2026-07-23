import { Module } from '@nestjs/common';
import { TasksResolver } from './task.resolver';
import { TasksService } from './task.service';

/**
 * Módulo encargado del dominio de Tareas.
 */
@Module({
  providers: [TasksResolver, TasksService],
  exports: [TasksService],
})
export class TasksModule {}