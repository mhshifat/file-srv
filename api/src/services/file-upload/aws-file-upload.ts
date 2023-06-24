import { awsConfig } from "../../config";
import { FileUpload } from "../../interfaces";
import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
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

  async get(key: string) {
    const getObjectParams = {
      Bucket: awsConfig.s3BucketName,
      Key: key,
    };
  
    try {
      const data = await s3Client.send(new GetObjectCommand(getObjectParams));
      if (!data || !data?.Body) throw new Error('500:-Failed to retrieve file');
      const bufferArr = await data.Body.transformToByteArray();
      const buffer = Buffer.from(bufferArr);
      return buffer;
    } catch (err) {
      throw new Error('500:-Failed to retrieve file');
    }
  }
}