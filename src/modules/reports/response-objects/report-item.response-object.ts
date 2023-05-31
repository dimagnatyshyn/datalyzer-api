import { ApiResponseProperty } from '@nestjs/swagger';

export class ReportItemResponseObject {
  @ApiResponseProperty()
  report_id: number;

  @ApiResponseProperty()
  name: string;

  @ApiResponseProperty()
  model_item_field_id: number;

  @ApiResponseProperty()
  id: number;

  @ApiResponseProperty()
  created_at: string;

  @ApiResponseProperty()
  updated_at: string;
}
