import {ApiResponseProperty} from '@nestjs/swagger';

export default class ModelResponseObject {
  @ApiResponseProperty()
  id: number;

  @ApiResponseProperty()
  name: string;

  @ApiResponseProperty()
  admin_id: number;

  @ApiResponseProperty()
  db_connection_id: number;

  @ApiResponseProperty()
  created_at: string;

  @ApiResponseProperty()
  updated_at: string;
}
