import { XLSXFileParserSrv } from './xlsx-file-parser';

class FileParserFactory {
  static create(strategyType = 'xlsx') {
    switch (strategyType) {
      case 'xlsx':
        return new XLSXFileParserSrv();
      default:
        throw new Error('Invalid strategy type');
    }
  }
}

export const fileParserStrategy = FileParserFactory.create();
