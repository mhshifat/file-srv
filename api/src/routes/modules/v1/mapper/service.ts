import { IMapperDocument, IGetMappersQuery } from '../../../../interfaces';
import { MapperModel } from './model';
import { FilterQuery } from 'mongoose';

export class MapperService {
  createRecord = (doc: Omit<IMapperDocument, 'created_at' | 'updated_at' | 'id'>) => {
    return MapperModel.createDoc(doc);
  }

  findAll = (query: IGetMappersQuery) => {
    const newQuery: FilterQuery<IMapperDocument> = {}
    if (query.fileId) newQuery['file_id'] = query.fileId;
    return MapperModel.find(newQuery) as unknown as IMapperDocument[];
  }
}