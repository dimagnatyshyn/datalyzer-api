import { IsNotEmpty, IsString, IsNumber, IsNumberString } from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class CreateConnectionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  host: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  port: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  databaseName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  typeId: number;
}
