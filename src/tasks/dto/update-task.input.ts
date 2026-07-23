import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateTaskInput } from './create-task.input';

/**
 * DTO para la actualización parcial de tareas.
 */
@InputType()
export class UpdateTaskInput extends PartialType(CreateTaskInput) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
}