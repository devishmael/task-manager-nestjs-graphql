import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * Aspecto de Logging (AOP) encargado de interceptar las peticiones a la API GraphQL,
 * midiendo tiempos de ejecución y registrando logs de éxito o error en la consola.
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('GraphQLAspect');

  /**
   * Intercepta la ejecución de Resolvers para registrar métricas y auditoría.
   * @param context Contexto de ejecución de NestJS/GraphQL.
   * @param next Handler para continuar el flujo de ejecución.
   * @returns Observable con la respuesta procesada.
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const gqlContext = GqlExecutionContext.create(context);
    const info = gqlContext.getInfo();

    const operationType = info?.parentType?.name || 'UnknownType';
    const fieldName = info?.fieldName || 'UnknownField';
    const startTime = Date.now();

    this.logger.log(`[START] Operación: ${operationType} -> ${fieldName}`);

    return next.handle().pipe(
      tap({
        next: () => {
          const duration = Date.now() - startTime;
          this.logger.log(
            `[END] Operación: ${operationType} -> ${fieldName} (${duration}ms)`,
          );
        },
        error: (error: Error) => {
          const duration = Date.now() - startTime;
          this.logger.error(
            `[ERROR] Operación: ${operationType} -> ${fieldName} (${duration}ms) - Mensaje: ${error.message}`,
          );
        },
      }),
    );
  }
}