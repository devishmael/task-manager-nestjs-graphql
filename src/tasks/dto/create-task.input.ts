import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsArray, IsEnum } from 'class-validator';
import { TaskStatus } from '../enums/task-status.enum';

/**
 * Datos requeridos para crear una tarea.
 */
@InputType()
export class CreateTaskInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  title: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  description: string;

  @Field(() => TaskStatus, { defaultValue: TaskStatus.BACKLOG })
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @Field(() => [String])
  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  assignedUser: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  project: string;
}