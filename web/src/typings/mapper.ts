export interface IMapper {
  id: string;
  created_at: Date;
  updated_at: Date;
  name: string;
  file_id: string;
  json_input: string;
  properties: {
    property: string;
    type: string;
  }[];
}