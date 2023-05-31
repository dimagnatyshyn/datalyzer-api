import { Test, TestingModule } from '@nestjs/testing';
import { ConnectionsRepositoryService } from '../connections-repository.service';
import {CONNECTION_REPOSITORY} from '../../../constants';

describe('ConnectionsRepositoryService', () => {
  let service: ConnectionsRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CONNECTION_REPOSITORY, useValue: {},
        },
        ConnectionsRepositoryService,
      ],
    }).compile();

    service = module.get<ConnectionsRepositoryService>(ConnectionsRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
