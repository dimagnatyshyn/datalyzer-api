import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardRepositoryService } from './dashboard-repository.service';
import { DashboardController } from './dashboard.controller';
import dashboardProviders from './dashboard.providers';
import DatabaseModule from '../database';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...dashboardProviders,
    DashboardService,
    DashboardRepositoryService,
  ],
  controllers: [DashboardController],
  exports: [DashboardService],
})
export class DashboardModule {}
