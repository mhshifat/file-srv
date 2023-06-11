import { awsConfig } from "../../config";
import { FileUpload } from "../../interfaces";
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from '../../lib';

export class AWSFileUploadSrv implements FileUpload {
  constructor() {
    if (!Object.values(awsConfig).every(value => value.length)) 
      throw new Error(`AWS Credentials are required - ${Object.keys(awsConfig).join(", ")}`)
  }

  async upload(filename: string, content: Buffer) {
    const command = new PutObjectCommand({
      Bucket: awsConfig.s3BucketName,
      Key: filename,
      Body: content,
    });
    const response = await s3Client.send(command);
    if (!response?.ETag) throw new Error('S3 upload failed');
    return {
      filename,
      etag: response.ETag,
      key: filename,
    }
  }
}