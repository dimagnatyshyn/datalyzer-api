import { Injectable } from '@nestjs/common';
import { DashboardRepositoryService } from './dashboard-repository.service';
import { searchQuery } from '../../base/utils';
import { DashboardCreateDto } from './dto/dashboardCreate.dto';

@Injectable()
export class DashboardService {
  constructor(private dashboardRepositoryService: DashboardRepositoryService) {}

  getDashboardDetails(dashboard: number, user: number) {
    return this.dashboardRepositoryService.getDashboardDetails(dashboard, user);
  }

  getDashboards(page, itemsPerPage, search, user) {
    const skip = (page - 1) * itemsPerPage;
    return this.dashboardRepositoryService.getPaginatedList({
      skip,
      itemsPerPage,
      matcher: { user_id: user, name: searchQuery(search) },
    });
  }

  createDashboard(data: DashboardCreateDto, user: number) {
    return this.dashboardRepositoryService.createDashboard(data.name, user);
  }

  deleteDashboard(dashboardId: number, user: number) {
    return this.dashboardRepositoryService.delete({ id: dashboardId, user_id: user });
  }

  async changeDashboardName(dashboard: number, name: string, user: number) {
    const matcher = { id: dashboard, user_id: user };
    await this.dashboardRepositoryService.update(matcher, { name });
    return this.dashboardRepositoryService.findById(dashboard);
  }

}
