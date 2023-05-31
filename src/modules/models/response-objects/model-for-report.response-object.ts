import {ApiResponseProperty} from '@nestjs/swagger';
import ModelItemForReportResponseObject from './model-item-for-report.response-object';

export default class ModelForReportResponseObject {
  @ApiResponseProperty()
  id: number;

  @ApiResponseProperty()
  name: string;

  @ApiResponseProperty({ type: [ModelItemForReportResponseObject] })
  items: ModelItemForReportResponseObject[];
}
