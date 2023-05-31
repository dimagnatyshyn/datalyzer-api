import { Test, TestingModule } from '@nestjs/testing';
import { ModelsController } from '../models.controller';
import {ModelsService} from '../models.service';

describe('Models Controller', () => {
  let controller: ModelsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: ModelsService, useValue: {} },
      ],
      controllers: [
        ModelsController,
      ],
    }).compile();

    controller = module.get<ModelsController>(ModelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
