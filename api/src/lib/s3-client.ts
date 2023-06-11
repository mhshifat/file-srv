import { S3Client } from '@aws-sdk/client-s3'
import { awsConfig } from '../config';

export const s3Client = new S3Client({
  region: awsConfig.s3Region,
  credentials: {
    accessKeyId: awsConfig.s3AccessKey,
    secretAccessKey: awsConfig.s3SecretKey,
  },
});