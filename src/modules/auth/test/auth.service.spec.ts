import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { UsersService } from '../../users/users.service';
import { BcryptService } from '../../../base/bcrypt.service';
import { JwtService } from '@nestjs/jwt';

describe('Auth service', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UsersService,
          useValue: {},
        },
        {
          provide: BcryptService,
          useValue: {},
        },
        {
          provide: JwtService,
          useValue: {},
        },
        AuthService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
