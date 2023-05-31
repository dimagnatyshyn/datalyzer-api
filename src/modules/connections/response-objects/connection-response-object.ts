import {ApiResponseProperty} from '@nestjs/swagger';

export class ConnectionResponseObject {
  @ApiResponseProperty()
  id: number;

  @ApiResponseProperty()
  username: string;

  @ApiResponseProperty()
  db_name: string;

  @ApiResponseProperty()
  name: string;

  @ApiResponseProperty()
  password: string;

  @ApiResponseProperty()
  host: string;

  @ApiResponseProperty()
  port: string;

  @ApiResponseProperty()
  admin_id: number;

  @ApiResponseProperty()
  type_id: number;

  @ApiResponseProperty()
  created_at: string;

  @ApiResponseProperty()
  updated_at: string;
}
