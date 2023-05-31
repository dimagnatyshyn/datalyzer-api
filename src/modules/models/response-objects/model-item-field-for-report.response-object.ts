import {ApiResponseProperty} from '@nestjs/swagger';

export default class ModelItemFieldForReportResponseObject {
  @ApiResponseProperty()
  id: number;
  @ApiResponseProperty()
  name: string;
  @ApiResponseProperty()
  type: string;
}
