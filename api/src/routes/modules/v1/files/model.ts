import mongoose, { model } from "mongoose";
import { IFile, IFileDocument, IFileModel } from "../../../../interfaces";

const schema = new mongoose.Schema<IFileDocument>({
  filename: { type: String, required: true },
  original_name: { type: String, required: true },
  key: { type: String, required: true },
  etag: { type: String, required: true },
  size: { type: Number, required: true },
  mimetype: { type: String, required: true },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  toJSON: { virtuals: true, transform(_, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret; 
  }, }
});

schema.statics = {
  async createDoc(doc: IFileDocument) {
    const newDoc = await this.create(doc);
    return newDoc.toJSON();
  }
};

export const FileModel = model<IFile, IFileModel>('files', schema);
