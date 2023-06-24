import mongoose, { model } from "mongoose";
import { IMapper, IMapperDocument, IMapperModel } from "../../../../interfaces";

const schema = new mongoose.Schema<IMapperDocument>({
  name: { type: String, required: true },
  file_id: { type: String, required: true },
  json_input: { type: String, required: true },
  properties: [
    {
      property: { type: String, required: true },
      type: { type: String, required: true },
      map_key: { type: String, required: true }
    }
  ]
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
  async createDoc(doc: IMapperDocument) {
    const newDoc = await this.create(doc);
    return newDoc.toJSON();
  }
};

export const MapperModel = model<IMapper, IMapperModel>('mappers', schema);
