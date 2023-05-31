import { ApiResponseProperty } from '@nestjs/swagger';

export class ReportUpdateResponseObject {
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
}
