import {ApiResponseProperty} from '@nestjs/swagger';

export class ConnectionRelationsResponseObject {
  @ApiResponseProperty()
  foreignTable: string;

  @ApiResponseProperty()
  fkColumn: string;

  @ApiResponseProperty()
  primaryTable: string;

  @ApiResponseProperty()
  pkColumn: string;
}
