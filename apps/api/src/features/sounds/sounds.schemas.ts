import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { FileSchema } from '@shared/files/files.schemas';
import { soundsTable } from './sounds.model';
import { SoundErrorCode } from './sounds.errors';
import { BadRequestErrorResponseSchema } from '@shared/responses/responses.schemas';

export const SoundQuerySchema = createSelectSchema(soundsTable)
  .omit({ fileId: true })
  .extend({ fileUrl: z.string().url() })
  .openapi('SoundResponse');

export const SoundCollectionQuerySchema = SoundQuerySchema.array().openapi('SoundCollectionResponse');

export const SoundMutationSchema = createInsertSchema(soundsTable, {
  name: ({ name }) => name.min(1).trim(),
  author: ({ author }) => author.min(1).trim(),
})
  .pick({ name: true, author: true })
  .extend({ file: FileSchema })
  .openapi('SoundRequest', { required: ['name', 'author', 'file'] });

export const SoundFilterSchema = createInsertSchema(soundsTable, {
  name: ({ name }) => name.trim(),
  author: ({ name }) => name.trim(),
})
  .pick({ name: true, author: true })
  .openapi('SoundFilterQueryParams');

export const SoundBadRequestErrorResponseSchema = BadRequestErrorResponseSchema.extend({
  errorCode: z.nativeEnum(SoundErrorCode),
}).openapi('SoundBadRequestErrorResponse');

export type Sound = z.infer<typeof SoundQuerySchema>;
export type NewSound = z.infer<typeof SoundMutationSchema>;
export type SoundFilter = z.infer<typeof SoundFilterSchema>;
