import {ApiResponseProperty} from '@nestjs/swagger';

export class ModelDataItemFieldResponseObject {
  @ApiResponseProperty()
  'field-name': 'field-data';
}
