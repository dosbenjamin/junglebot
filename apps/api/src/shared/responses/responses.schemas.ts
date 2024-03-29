import { NotFoundErrorCode } from '@shared/error-handling/error-handling.errors';
import { StatusCode } from '@shared/status-codes/status-codes.constants';
import { StorageErrorCode } from '@providers/storage/storage.errors';
import { DrizzleErrorCode } from '@providers/drizzle/drizzle.errors';
import { z } from 'zod';

const ResponseSchema = z.object({
  statusCode: z.number(),
});

const ErrorResponseSchema = ResponseSchema.extend({
  message: z.string(),
  errorCode: z.string(),
});

export const BadRequestErrorResponseSchema = ErrorResponseSchema.extend({
  statusCode: z.literal(StatusCode.BadRequest),
}).openapi('BadRequestErrorResponse');

export const NotFoundErrorResponseSchema = ErrorResponseSchema.extend({
  statusCode: z.literal(StatusCode.NotFound),
  errorCode: z.nativeEnum(NotFoundErrorCode),
}).openapi('NotFoundErrorResponse');

export const InternalServerErrorResponseSchema = ErrorResponseSchema.extend({
  statusCode: z.literal(StatusCode.InternalServerError),
  errorCode: z.nativeEnum({
    ...StorageErrorCode,
    ...DrizzleErrorCode,
  }),
}).openapi('InternalServerErrorResponse');

export const OkResponseSchema = ResponseSchema.extend({
  statusCode: z.literal(StatusCode.Ok),
  data: z.unknown(),
}).openapi('OkResponse');
