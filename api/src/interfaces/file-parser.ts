import { IFileDocument, IMapperDocument } from "./resources";

export interface FileParser {
  parse(file: IFileDocument, mapper: IMapperDocument): Promise<unknown[]> 
  getFirstObj(file: IFileDocument): Promise<unknown> 
}