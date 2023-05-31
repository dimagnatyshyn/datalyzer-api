import {IsString, IsNumber, IsOptional} from 'class-validator';
import {ApiPropertyOptional} from '@nestjs/swagger';

export default class UpdateUserDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  username: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  user_type_id: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;
}
