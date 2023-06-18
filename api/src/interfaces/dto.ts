import { z } from "zod";
import { CreateMapperDtoSchema } from "../routes/modules/v1/mapper/validations";

export type CreateMapperDto = z.infer<typeof CreateMapperDtoSchema>;