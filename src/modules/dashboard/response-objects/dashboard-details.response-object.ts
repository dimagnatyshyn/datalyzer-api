import { ApiResponseProperty } from '@nestjs/swagger';
import { DashboardReportResponseObject } from './dashboard-report.response-object';

export class DashboardDetailsResponseObject {
  @ApiResponseProperty()
  id: number;

  @ApiResponseProperty()
  name: string;

  @ApiResponseProperty()
  user_id: number;

  @ApiResponseProperty()
  created_at: string;

  @ApiResponseProperty()
  updated_at: string;

  @ApiResponseProperty({ type: [DashboardReportResponseObject] })
  reports: DashboardReportResponseObject[];
}
