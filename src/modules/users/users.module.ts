import { Module } from '@nestjs/common';
import DatabaseModule from '../database';
import userProviders from './users.providers';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {BcryptService} from '../../base/bcrypt.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    BcryptService,
    ...userProviders,
    UsersService,
  ],
  exports: [UsersService],
})

export class UsersModule {}
