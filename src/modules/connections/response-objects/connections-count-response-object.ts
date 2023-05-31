import {ApiResponseProperty} from '@nestjs/swagger';

export class ConnectionsCountResponseObject {
  @ApiResponseProperty()
  count: number;
}
