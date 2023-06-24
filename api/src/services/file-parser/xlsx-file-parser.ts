import XLSX from 'xlsx';
import { FileParser, IFileDocument, IMapperDocument } from "../../interfaces";
import { uploadStrategy } from "../file-upload";

// {
//   "name": "John Doe",
//   "age": 30,
//   "hobbies": [
//     "programming",
//     "gaming",
//     { "category": "sports", "activities": ["football", "basketball"] }
//   ],
//   "educations": [
//     {
//       "institute": "ABC",
//       "grade": "A+"
//     }
//   ],
//   "addresses": {
//     "home": "Address One",
//     "office": "Address Two"
//   }
// }

export class XLSXFileParserSrv implements FileParser {
  async parse(file: IFileDocument, mapper: IMapperDocument): Promise<unknown[]> {
    const contentBuffer = await uploadStrategy.get(file.key);
    const workbook = XLSX.read(contentBuffer);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(worksheet, {defval:""});
    const mapperProperties = mapper.properties;
    const parsedData = [];
    for await (const obj of data) {
      const fileObj: any = obj;
      const constructedObj: any = {}
      mapperProperties.forEach(item => {
        const fileValue = fileObj[item.map_key];
        constructedObj[item.property] = fileValue;
      });
      parsedData.push(constructedObj);
    }
    return parsedData;
  }

  async getFirstObj(file: IFileDocument): Promise<unknown> {
    const contentBuffer = await uploadStrategy.get(file.key);
    const workbook = XLSX.read(contentBuffer);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(worksheet, {defval:""});
    return data[0];
  }
}