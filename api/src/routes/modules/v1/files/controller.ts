import { Request, Response } from "express";
import { FileService } from "./service";
import { IFileDocument, IFileUploadQuery, IGetFilesQuery, SuccessResponse } from "../../../../interfaces";
import { fileUploadQuerySchema } from "./validations";

export class FileController {
  private readonly service = new FileService();

  getAll = async (req: Request, res: Response<SuccessResponse<IFileDocument[]>>) => {
    const query = req.query as unknown as IGetFilesQuery;
    const records = await this.service.findAll(query);
    return res.status(200).json({
      status: 200,
      success: true,
      data: records
    })
  }

  getFileStructure = async (req: Request, res: Response<SuccessResponse<unknown>>) => {
    const params = req.params as unknown as { fileId: string };
    const data = await this.service.getFileStructure(params.fileId);
    return res.status(200).json({
      status: 200,
      success: true,
      data: data
    })
  }

  upload = async (req: Request, res: Response<SuccessResponse<IFileDocument | undefined>>) => {
    await fileUploadQuerySchema.parse(req.query);
    const { complete, filename } = req.query as unknown as IFileUploadQuery;
    if (!filename) throw new Error('File name is required in the header');
    req.on('data', async (chunk) => {
      this.service.upload(filename, chunk, Boolean(complete), req.query as IFileUploadQuery);
    })
    res.end();
  }
}