import { IsString, IsNumberString, IsOptional, IsNumber } from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class UpdateConnectionDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  host: string;

  @ApiProperty()
  @IsOptional()
  @IsNumberString()
  port: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  username: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  databaseName: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  type: number;
}
