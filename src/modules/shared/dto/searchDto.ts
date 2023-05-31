import {IsNumber, IsString, IsOptional} from 'class-validator';
import { Type } from 'class-transformer';
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';

export class SearchDto {
  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  page: number;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  itemsPerPage: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;
}
