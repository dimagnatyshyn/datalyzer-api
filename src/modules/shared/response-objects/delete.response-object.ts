import {ApiResponseProperty} from '@nestjs/swagger';

export class DeleteResponseObject {
  @ApiResponseProperty()
  raw: [];

  @ApiResponseProperty()
  affected: number;
}
