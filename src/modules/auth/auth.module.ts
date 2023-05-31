import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AdminStrategy } from './strategies/admin.strategy';
import { UserStrategy } from './strategies/user.strategy';
import { AuthController } from './auth.controller';
import { BcryptService } from '../../base/bcrypt.service';

@Module({
  controllers: [AuthController],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    UserStrategy,
    AdminStrategy,
    BcryptService,
  ],
})
export class AuthModule {}
