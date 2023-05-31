import {ApiResponseProperty} from '@nestjs/swagger';
import ModelItemFieldForReportResponseObject from './model-item-field-for-report.response-object';

export default class ModelItemForReportResponseObject {
  @ApiResponseProperty()
  id: number;

  @ApiResponseProperty()
  name: string;

  @ApiResponseProperty()
  relations: number[];

  @ApiResponseProperty({ type: [ModelItemFieldForReportResponseObject] })
  fields: ModelItemFieldForReportResponseObject[];
}
