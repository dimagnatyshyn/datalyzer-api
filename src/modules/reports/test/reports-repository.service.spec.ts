import { Test, TestingModule } from '@nestjs/testing';
import { ReportsRepositoryService } from '../reports-repository.service';
import { REPORT_ITEM_REPOSITORY, REPORT_REPOSITORY } from '../../../constants';

describe('ReportsRepositoryService', () => {
  let service: ReportsRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: REPORT_ITEM_REPOSITORY, useValue: {} },
        { provide: REPORT_REPOSITORY, useValue: {} },
        ReportsRepositoryService,
      ],
    }).compile();

    service = module.get<ReportsRepositoryService>(ReportsRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
