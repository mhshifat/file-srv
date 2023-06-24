import { Request, Response } from "express";
import { MapperService } from "./service";
import { IMapperDocument, IGetMappersQuery, SuccessResponse, CreateMapperDto } from "../../../../interfaces";
import { CreateMapperDtoSchema } from "./validations";

export class MapperController {
  private readonly service = new MapperService();

  getAll = async (req: Request, res: Response<SuccessResponse<IMapperDocument[]>>) => {
    const query = req.query as unknown as IGetMappersQuery;
    const records = await this.service.findAll(query);
    return res.status(200).json({
      status: 200,
      success: true,
      data: records
    })
  }

  create = async (req: Request, res: Response<SuccessResponse<IMapperDocument | undefined>>) => {
    await CreateMapperDtoSchema.parse(req.body);
    const { name, fileId, jsonInput, mapperProperties } = req.body as unknown as CreateMapperDto;
    const data = await this.service.createRecord({
      name,
      file_id: fileId,
      json_input: jsonInput,
      properties: mapperProperties
    });
    return res.status(201).json({
      status: 201,
      success: true,
      data: data
    })
  }

  construct = async (req: Request, res: Response<SuccessResponse<unknown>>) => {
    const params = req.params as { mapperId: string };
    const results = await this.service.construct(params.mapperId);
    return res.status(200).json({
      status: 200,
      success: true,
      data: results
    })
  }
}