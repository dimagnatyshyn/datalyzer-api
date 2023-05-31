import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class IdDto {
  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  id: number;
}
