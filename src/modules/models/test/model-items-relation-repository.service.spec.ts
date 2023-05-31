import { Test, TestingModule } from '@nestjs/testing';
import { ModelItemsRelationRepositoryService } from '../model-items-relation-repository.service';
import { MODEL_ITEM_RELATION_REPOSITORY } from '../../../constants';

describe('ModelItemsRelationRepositoryService', () => {
  let service: ModelItemsRelationRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: MODEL_ITEM_RELATION_REPOSITORY, useValue: {} },
        ModelItemsRelationRepositoryService,
      ],
    }).compile();

    service = module.get<ModelItemsRelationRepositoryService>(ModelItemsRelationRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
