import { Test, TestingModule } from '@nestjs/testing';
import { DashboardRepositoryService } from '../dashboard-repository.service';
import { DASHBOARD_REPOSITORY } from '../../../constants';

describe('DashboardRepositoryService', () => {
  let service: DashboardRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: DASHBOARD_REPOSITORY, useValue: {} },
        DashboardRepositoryService,
      ],
    }).compile();

    service = module.get<DashboardRepositoryService>(DashboardRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
