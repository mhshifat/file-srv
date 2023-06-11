const {
  AWS_S3_REGION,
  AWS_S3_BUCKET_NAME,
  AWS_S3_ACCESS_KEY,
  AWS_S3_SECRET_KEY,
} = process.env;

export const awsConfig = {
  s3Region: AWS_S3_REGION || '',
  s3BucketName: AWS_S3_BUCKET_NAME || '',
  s3AccessKey: AWS_S3_ACCESS_KEY || '',
  s3SecretKey: AWS_S3_SECRET_KEY || '',
}