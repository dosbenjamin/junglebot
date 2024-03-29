import { Data } from 'effect';

export const StorageErrorCode = {
  UploadToS3Bucket: 'Storage.UploadToS3Bucket',
  DeleteFromS3Bucket: 'Storage.DeleteFromS3Bucket',
} as const;
export type StorageErrorCode = (typeof StorageErrorCode)[keyof typeof StorageErrorCode];

export class StorageError extends Data.TaggedError('StorageError')<{
  errorCode: StorageErrorCode;
  message: string;
}> {}
