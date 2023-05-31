import {
  IsNumber,
  Min,
  IsOptional,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateReportDto {
  @ApiPropertyOptional({ minimum: 40 })
  @IsOptional()
  @IsNumber()
  @Min(40)
  readonly width?: number;

  @ApiPropertyOptional({ minimum: 40 })
  @IsOptional()
  @IsNumber()
  @Min(40)
  readonly height?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly position_x?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly position_y?: number;

}
