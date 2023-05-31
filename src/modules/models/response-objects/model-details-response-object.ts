import {ApiResponseProperty} from '@nestjs/swagger';

export class ModelDetailsResponseObject {
  @ApiResponseProperty()
  id: number;

  @ApiResponseProperty()
  name: string;

  @ApiResponseProperty()
  users: number;

  @ApiResponseProperty()
  created: string;

  @ApiResponseProperty()
  tables: number;

  @ApiResponseProperty()
  fields: number;

  @ApiResponseProperty()
  uses: number;

  @ApiResponseProperty()
  active: boolean;
}
