import {IsNotEmpty, MinLength, IsString, IsNumber, IsOptional} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export default class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  user_type_id: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;
}
