import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import User from '../database/entities/user.entity';
import { BcryptService } from '../../base/bcrypt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = await this.usersService.getUserWithLoginCredits(username);
    const isPassCorrect = (
      user && await this.bcryptService.compare(pass, user.password)
    );

    return isPassCorrect ? user : null;
  }

  async login({ password, ...user }: User) {
    const payload = {
      username: user.username,
      id: user.id,
      user_type: user.user_type,
    };
    return {
      ...user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
