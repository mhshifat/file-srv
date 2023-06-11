const { PORT = 8000 } = process.env;
import packageJSON from '../../package.json';

export const appConfig = {
  port: PORT,
  version: packageJSON.version,
  name: 'File Processing Service',
  description: packageJSON.description
}