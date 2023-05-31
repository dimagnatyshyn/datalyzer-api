import {ApiResponseProperty} from '@nestjs/swagger';

export class UserCountResponseObject {
  @ApiResponseProperty()
  count: number;
}
