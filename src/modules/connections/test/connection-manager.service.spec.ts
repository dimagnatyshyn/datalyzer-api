import { Test, TestingModule } from '@nestjs/testing';
import { ConnectionManagerService } from '../connection-manager.service';
import { ConnectionsRepositoryService } from '../connections-repository.service';

describe('ConnectionManagerService', () => {
  let service: ConnectionManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ConnectionsRepositoryService, useValue: {},
        },
        ConnectionManagerService,
      ],
    }).compile();

    service = module.get<ConnectionManagerService>(ConnectionManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
