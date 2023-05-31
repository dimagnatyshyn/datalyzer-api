import { ApiResponseProperty } from '@nestjs/swagger';

export class DashboardResponseObject {
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
}
