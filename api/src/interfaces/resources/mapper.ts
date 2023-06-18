import { Model } from "mongoose";
import { IModel } from "../model";

export interface IMapperDocument extends IModel {
  name: string;
  file_id: string;
  json_input: string;
  properties: {
    property: string;
    type: string;
  }[];
}

export interface IMapper extends Document, Omit<IMapperDocument, 'id'> {}

export interface IMapperModel extends Model<IMapper> {
  createDoc(doc: Omit<IMapperDocument, 'created_at' | 'updated_at' | 'id'>): Promise<IMapperDocument>
}