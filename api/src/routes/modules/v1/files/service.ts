import fs from 'fs';
import util from 'util';
import { fileParserStrategy, uploadStrategy } from '../../../../services';
import { IFileDocument, IFileUploadQuery, IGetFilesQuery } from '../../../../interfaces';
import { FileModel } from './model';
import { FilterQuery } from 'mongoose';

const readFileAsync = util.promisify(fs.readFile);

export class FileService {
  upload = async (filename: string, content: Buffer, isComplete: boolean, optionalParameters: IFileUploadQuery) => {
    fs.appendFileSync(filename, content);
    if (!isComplete) return;
    const fileContent = await readFileAsync(filename);
    const response = await uploadStrategy.upload(filename, fileContent);
    const fsPro = fs.promises;
    try {
      await fsPro.access(filename);
      await fsPro.unlink(filename);
      await this.createRecord({
        ...optionalParameters,
        ...response,
        size: Number(optionalParameters.size)
      });
    } catch (err) {
      throw new Error('File not found to be unlinked');
    }
  }

  createRecord = (doc: Omit<IFileDocument, 'created_at' | 'updated_at' | 'id'>) => {
    return FileModel.createDoc(doc);
  }

  findAll = (query: IGetFilesQuery) => {
    const newQuery: FilterQuery<IFileDocument> = {}
    if (query.search) newQuery['$or'] = ['original_name'].map(item => ({ [item]: new RegExp(query.search!, 'i') }));
    return FileModel.find(newQuery) as unknown as IFileDocument[];
  }

  findById = async (id: string) => {
    const file = await FileModel.findById(id);
    if (!file) throw new Error("File not found");
    return file as IFileDocument;
  }

  getFileStructure = async (id: string) => {
    const file = await this.findById(id);
    return await fileParserStrategy.getFirstObj(file);
  }
}