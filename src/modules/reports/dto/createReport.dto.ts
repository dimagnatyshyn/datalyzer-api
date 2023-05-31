import { IsArray, IsNumber, IsString, ArrayNotEmpty, ArrayMinSize, ArrayMaxSize, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateReportDto {
  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsNumber()
  readonly dashboard: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly newDashboardName?: string;

  @ApiProperty()
  @IsNumber()
  readonly type: number;

  @ApiProperty({ isArray: true, uniqueItems: true, maxItems: 2, minItems: 2})
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  readonly modelItems: number[];
}
