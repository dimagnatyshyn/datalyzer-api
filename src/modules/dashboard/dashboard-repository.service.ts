import { Inject, Injectable } from '@nestjs/common';
import BaseRepositoryService from '../../base/baseRepository.service';
import Dashboard from '../database/entities/dashboard.entity';
import { DASHBOARD_REPOSITORY } from '../../constants';
import { Repository } from 'typeorm';

@Injectable()
export class DashboardRepositoryService extends BaseRepositoryService<Dashboard> {
  constructor(
    @Inject(DASHBOARD_REPOSITORY)
    private readonly dashboardRepository: Repository<Dashboard>,
  ) {
    super(dashboardRepository);
  }

  createDashboard(name, user) {
    const dashboard = new Dashboard();
    dashboard.name = name;
    dashboard.user_id = user;
    return this.dashboardRepository.save(dashboard);
  }

  getDashboardDetails(dashboard: number, user: number) {
    return this.dashboardRepository.findOne({
      where: { id: dashboard, user_id: user },
      relations: ['reports'],
    });
  }
}
