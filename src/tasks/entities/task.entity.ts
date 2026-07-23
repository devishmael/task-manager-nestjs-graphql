import { ObjectType, Field, ID } from '@nestjs/graphql';
import { TaskStatus } from '../enums/task-status.enum';

/**
 * Modelo de datos para GraphQL que representa una Tarea.
 */
@ObjectType({ description: 'Entidad Tarea' })
export class Task {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => TaskStatus)
  status: TaskStatus;

  @Field(() => [String])
  tags: string[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => String)
  assignedUser: string;

  @Field(() => String)
  project: string;
}
