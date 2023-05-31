import { Test, TestingModule } from '@nestjs/testing';
import { ModelItemsRepositoryService } from '../model-items-repository.service';
import { MODEL_ITEM_REPOSITORY } from '../../../constants';

describe('ModelItemsRepositoryService', () => {
  let service: ModelItemsRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: MODEL_ITEM_REPOSITORY, useValue: {} },
        ModelItemsRepositoryService,
      ],
    }).compile();

    service = module.get<ModelItemsRepositoryService>(ModelItemsRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
