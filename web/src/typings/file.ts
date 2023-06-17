export interface IFile {
  id: string;
  created_at: Date;
  updated_at: Date;
  filename: string;
  key: string;
  etag: string;
  size: number;
  mimetype: string;
  original_name: string;
}