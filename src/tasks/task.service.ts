import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { TaskStatus } from './enums/task-status.enum';

/**
 * Servicio encargado de gestionar las operaciones CRUD de tareas en memoria.
 */
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  /**
   * Crea una nueva tarea y la almacena en el arreglo local.
   * @param createTaskInput Datos de la nueva tarea.
   * @returns La tarea creada.
   */
  create(createTaskInput: CreateTaskInput): Task {
    const newTask: Task = {
      id: uuidv4(),
      createdAt: new Date(),
      status: createTaskInput.status || TaskStatus.BACKLOG,
      ...createTaskInput,
    };

    this.tasks.push(newTask);
    return newTask;
  }

  /**
   * Obtiene la lista completa de tareas registrados.
   * @returns Arreglo de tareas.
   */
  findAll(): Task[] {
    return this.tasks;
  }

  /**
   * Busca una tarea por su id único.
   * @param id Identificador UUID de la tarea.
   * @returns La tarea encontrada.
   * @throws NotFoundException si la tarea no existe.
   */
  findOne(id: string): Task {
    const task = this.tasks.find((item) => item.id === id);
    if (!task) {
      throw new NotFoundException(`Tarea con ID "${id}" no encontrada`);
    }
    return task;
  }

  /**
   * Actualiza los datos de una tarea existente.
   * @param id Identificador de la tarea a modificar.
   * @param updateTaskInput Campos a actualizar.
   * @returns La tarea actualizada.
   */
  update(id: string, updateTaskInput: UpdateTaskInput): Task {
    const task = this.findOne(id);
    Object.assign(task, updateTaskInput);
    return task;
  }

  /**
   * Elimina una tarea por su ID.
   * @param id Identificador de la tarea.
   * @returns Verdadero si la eliminación fue exitosa.
   */
  remove(id: string): boolean {
    const taskIndex = this.tasks.findIndex((item) => item.id === id);
    if (taskIndex === -1) {
      throw new NotFoundException(`Tarea con ID "${id}" no encontrada`);
    }
    this.tasks.splice(taskIndex, 1);
    return true;
  }
}