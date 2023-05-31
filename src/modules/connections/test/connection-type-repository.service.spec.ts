import { Test, TestingModule } from '@nestjs/testing';
import { ConnectionTypeRepositoryService } from '../connection-type-repository.service';
import {CONNECTION_TYPE_REPOSITORY} from '../../../constants';

describe('ConnectionTypeRepositoryService', () => {
  let service: ConnectionTypeRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CONNECTION_TYPE_REPOSITORY, useValue: {},
        },
        ConnectionTypeRepositoryService,
      ],
    }).compile();

    service = module.get<ConnectionTypeRepositoryService>(ConnectionTypeRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
