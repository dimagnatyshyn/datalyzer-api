import { Test, TestingModule } from '@nestjs/testing';
import { ReportsService } from '../reports.service';
import { ModelsService } from '../../models/models.service';
import { ConnectionManagerService } from '../../connections/connection-manager.service';
import { ReportsRepositoryService } from '../reports-repository.service';
import { DashboardService } from '../../dashboard/dashboard.service';

describe('ReportsService', () => {
  let service: ReportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: DashboardService, useValue: {} },
        { provide: ModelsService, useValue: {} },
        { provide: ReportsRepositoryService, useValue: {} },
        { provide: ConnectionManagerService, useValue: {} },
        ReportsService,
      ],
    }).compile();

    service = module.get<ReportsService>(ReportsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
