import {ApiResponseProperty} from '@nestjs/swagger';

export class ConnectionTablesResponseObject {
  @ApiResponseProperty()
  tableName: string;

  @ApiResponseProperty()
  columns: string[];
}
