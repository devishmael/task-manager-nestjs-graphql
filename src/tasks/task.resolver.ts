import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UseInterceptors } from '@nestjs/common';
import { TasksService } from './task.service';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';

/**
 * Resolver de GraphQL que expone los endpoints CRUD para Tareas.
 * Aplica el aspecto de Logging transversal mediante AOP.
 */
@Resolver(() => Task)
@UseInterceptors(LoggingInterceptor) // <-- Aplicación de AOP
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  /**
   * Consulta GraphQL para obtener todas las tareas.
   * @returns Lista de tareas registradas.
   */
  @Query(() => [Task], { name: 'tasks', description: 'Obtener todas las tareas' })
  findAll(): Task[] {
    return this.tasksService.findAll();
  }

  /**
   * Consulta GraphQL para obtener una tarea por su ID.
   * @param id Identificador UUID de la tarea.
   * @returns Tarea encontrada.
   */
  @Query(() => Task, { name: 'task', description: 'Obtener una tarea por su ID' })
  findOne(@Args('id', { type: () => ID }) id: string): Task {
    return this.tasksService.findOne(id);
  }

  /**
   * Mutación GraphQL para registrar una nueva tarea.
   * @param createTaskInput DTO con la información de la nueva tarea.
   * @returns Tarea creada.
   */
  @Mutation(() => Task, { description: 'Crear una nueva tarea' })
  createTask(
    @Args('createTaskInput') createTaskInput: CreateTaskInput,
  ): Task {
    return this.tasksService.create(createTaskInput);
  }

  /**
   * Mutación GraphQL para editar una tarea existente.
   * @param updateTaskInput DTO con los campos modificados de la tarea.
   * @returns Tarea actualizada.
   */
  @Mutation(() => Task, { description: 'Editar datos de una tarea' })
  updateTask(
    @Args('updateTaskInput') updateTaskInput: UpdateTaskInput,
  ): Task {
    return this.tasksService.update(updateTaskInput.id, updateTaskInput);
  }

  /**
   * Mutación GraphQL para eliminar una tarea.
   * @param id Identificador UUID de la tarea.
   * @returns Confirmación booleana de eliminación.
   */
  @Mutation(() => Boolean, { description: 'Eliminar una tarea del sistema' })
  removeTask(@Args('id', { type: () => ID }) id: string): boolean {
    return this.tasksService.remove(id);
  }
}