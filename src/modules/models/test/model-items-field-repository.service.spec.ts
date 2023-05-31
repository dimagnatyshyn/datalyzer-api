import { Test, TestingModule } from '@nestjs/testing';
import { ModelItemsFieldRepositoryService } from '../model-items-field-repository.service';
import { MODEL_ITEM_FIELD_REPOSITORY } from '../../../constants';

describe('ModelItemsFieldRepositoryService', () => {
  let service: ModelItemsFieldRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: MODEL_ITEM_FIELD_REPOSITORY, useValue: {} },
        ModelItemsFieldRepositoryService,
      ],
    }).compile();

    service = module.get<ModelItemsFieldRepositoryService>(ModelItemsFieldRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
