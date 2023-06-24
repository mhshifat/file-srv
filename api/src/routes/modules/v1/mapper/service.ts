import { IMapperDocument, IGetMappersQuery } from '../../../../interfaces';
import { fileParserStrategy, uploadStrategy } from '../../../../services';
import { FileService } from '../files/service';
import { MapperModel } from './model';
import { FilterQuery } from 'mongoose';

export class MapperService {
  private readonly _fileService = new FileService();

  createRecord = (doc: Omit<IMapperDocument, 'created_at' | 'updated_at' | 'id'>) => {
    return MapperModel.createDoc(doc);
  }

  findAll = (query: IGetMappersQuery) => {
    const newQuery: FilterQuery<IMapperDocument> = {}
    if (query.fileId) newQuery['file_id'] = query.fileId;
    return MapperModel.find(newQuery) as unknown as IMapperDocument[];
  }

  construct = async (mapperId: string) => {
    const mapper = await MapperModel.findById(mapperId);
    if (!mapper) throw new Error('Mapper not found');
    const file = await this._fileService.findById(mapper.file_id);
    return await fileParserStrategy.parse(file, mapper as IMapperDocument);
  }
}