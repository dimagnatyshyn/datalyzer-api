import {ApiResponseProperty} from '@nestjs/swagger';

export class LoginResponseObject {
  @ApiResponseProperty()
  id: number;

  @ApiResponseProperty()
  username: string;

  @ApiResponseProperty()
  description: string;

  @ApiResponseProperty()
  user_type_id: number;

  @ApiResponseProperty()
  created_by_id: number;

  @ApiResponseProperty()
  created_at: string;

  @ApiResponseProperty()
  updated_at: string;

  @ApiResponseProperty()
  access_token: string;
}
