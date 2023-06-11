import { AWSFileUploadSrv } from './aws-file-upload';

class FileUploadFactory {
  static create(strategyType = 'aws') {
    switch (strategyType) {
      case 'aws':
        return new AWSFileUploadSrv();
      default:
        throw new Error('Invalid strategy type');
    }
  }
}

export const uploadStrategy = FileUploadFactory.create();
