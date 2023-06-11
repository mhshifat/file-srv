import { Model } from "mongoose";
import { IModel } from "../model";

export interface IFileDocument extends IModel {
  filename: string;
  key: string;
  etag: string;
  size: number;
  mimetype: string;
  original_name: string;
}

export interface IFile extends Document, Omit<IFileDocument, 'id'> {}

export interface IFileModel extends Model<IFile> {
  createDoc(doc: Omit<IFileDocument, 'created_at' | 'updated_at' | 'id'>): Promise<IFileDocument>
}