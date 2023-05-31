import { IsNotEmpty } from 'class-validator';
import { UserType } from './user.type.dto';
import {ApiProperty} from '@nestjs/swagger';

export class UserJwtDto {
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  user_type: UserType;
}
