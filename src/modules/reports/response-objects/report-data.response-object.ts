import { ApiResponseProperty } from '@nestjs/swagger';
import { ModelDataItemFieldResponseObject } from './model-data-item-field-response-object';

export class ReportDataResponseObject {
  @ApiResponseProperty()
  dashboard_id: number;

  @ApiResponseProperty()
  name: string;

  @ApiResponseProperty()
  user_id: number;

  @ApiResponseProperty()
  report_type_id: number;

  @ApiResponseProperty()
  id: number;

  @ApiResponseProperty()
  width: number;

  @ApiResponseProperty()
  height: number;

  @ApiResponseProperty()
  position_x: number;

  @ApiResponseProperty()
  position_y: number;

  @ApiResponseProperty()
  created_at: string;

  @ApiResponseProperty()
  updated_at: string;

  @ApiResponseProperty({ type: [ModelDataItemFieldResponseObject] })
  report_items: ModelDataItemFieldResponseObject[];

  @ApiResponseProperty()
  dimensions: string[];

  @ApiResponseProperty()
  facts: string[];
}
