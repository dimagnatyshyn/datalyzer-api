import { Test } from '@nestjs/testing';
import { UsersService } from '../users.service';
import getRepositoryMock from '../../../mocks/repositoryMock';
import usersMock from '../../../mocks/usersMock';
import {USER_REPOSITORY, USER_TYPE_REPOSITORY} from '../../../constants';
import userTypesMock from '../../../mocks/userTypeMock';
import {BcryptService} from '../../../base/bcrypt.service';
import CreateUserDto from '../dto/create.dto';

const userRepositoryMock = getRepositoryMock(usersMock);
const userTypeRepositoryMock = getRepositoryMock(userTypesMock);

describe('User AuthService', () => {
  let userService: UsersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: USER_REPOSITORY,
          useClass: userRepositoryMock,
        },
        {
          provide: USER_TYPE_REPOSITORY,
          useClass: userTypeRepositoryMock,
        },
        BcryptService,
        UsersService,
      ],
    }).compile();

    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should return users by name', async () => {
    const userResult = await userService.getByUserName('name');
    expect(userResult).toBe(usersMock[0]);
  });

  it('should create users', async () => {
    const newUserData: CreateUserDto = {
        username: 'new user',
        password: '123321',
        user_type_id: 2,
        description: 'bla bla',
    };
    userService.getByUserName = jest.fn().mockReturnValue(null);
    const createdUser = await userService.create(newUserData, 1);
    expect(createdUser.username).toBe(newUserData.username);
  });

  it('should get only admins', async () => {
    const admins = await userService.getUsersByType('admin');
    expect(admins).toBe(usersMock);
  });

  it('should get only users', async () => {
    const users = await userService.getUsersByType('user');
    expect(users).toBe(usersMock);
  });
});
