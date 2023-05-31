import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

const saltRounds = 10;

@Injectable()
export class BcryptService {
  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, saltRounds);
  }

  compare(password: string, hashPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashPassword);
  }
}
