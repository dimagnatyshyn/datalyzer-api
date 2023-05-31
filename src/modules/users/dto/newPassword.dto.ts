import { IsNotEmpty, IsString, Length, MinLength } from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class NewPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  @IsString()
  old_password: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  @IsString()
  password: string;
}
