import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';

export class CheckConnectionDto {
  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  id: number;
}
