import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksResolver } from './tasks.resolver';

/**
 * Módulo encargado del dominio de Tareas.
 */
@Module({
  providers: [TasksResolver, TasksService],
  exports: [TasksService],
})
export class TasksModule {}