import {ApiResponseProperty} from '@nestjs/swagger';

export class ModelsCountResponseObject {
  @ApiResponseProperty()
  count: number;
}
