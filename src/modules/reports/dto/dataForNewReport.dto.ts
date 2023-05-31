import { IsArray, ArrayNotEmpty, ArrayMaxSize } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class DataForNewReportDto {
  @ApiProperty()
  @Transform(({ value }): number[] => value.map((i) => parseInt(i, 10)) )
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMaxSize(2)
  readonly modelItemFieldId: number[];
}
