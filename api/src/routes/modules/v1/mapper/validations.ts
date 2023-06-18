import { z } from 'zod';

export const CreateMapperDtoSchema = z.object({
  name: z.string(),
  fileId: z.string(),
  jsonInput: z.string(),
  mapperProperties: z.array(z.object({
    property: z.string(),
    type: z.string(),
  })) 
});
