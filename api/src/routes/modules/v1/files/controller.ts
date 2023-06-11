import { Request, Response } from "express";
import { FileService } from "./service";
import { IFileDocument, IFileUploadQuery, SuccessResponse } from "../../../../interfaces";
import { fileUploadQuerySchema } from "./validations";

export class FileController {
  private readonly service = new FileService();

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