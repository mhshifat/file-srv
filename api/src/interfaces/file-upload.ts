import { z } from 'zod';
import { fileUploadQuerySchema } from './../routes/modules/v1/files/validations';

export interface FileUpload {
  get(key: string): Promise<Buffer>
  upload(filename: string, content: Buffer): Promise<{ filename: string; etag: string; key: string; }>
}

export type IFileUploadQuery = z.infer<typeof fileUploadQuerySchema>;