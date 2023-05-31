import { Test, TestingModule } from '@nestjs/testing';
import { ModelsRepositoryService } from '../models-repository.service';
import {ModelsService} from '../models.service';
import {MODEL_REPOSITORY} from '../../../constants';

describe('ModelsRepositoryService', () => {
  let service: ModelsRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: MODEL_REPOSITORY, useValue: {} },
        ModelsRepositoryService,
      ],
    }).compile();

    service = module.get<ModelsRepositoryService>(ModelsRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
