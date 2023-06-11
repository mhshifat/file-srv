import { z } from 'zod';

export const fileUploadQuerySchema = z.object({
  complete: z.string().optional(),
  filename: z.string(),
  size: z.string(),
  mimetype: z.string(),
  original_name: z.string(),
});
