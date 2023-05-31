import { IsArray, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { RelationItem } from './relationItem.dto';
import { ModelItem } from './modelItem.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateModelDto {
  @ApiProperty()
  @IsNumber()
  readonly connectionId: number;

  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiPropertyOptional({ type: [RelationItem] })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => RelationItem)
  readonly relations: RelationItem[];

  @ApiProperty({ type: [ModelItem] })
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => ModelItem)
  readonly items: ModelItem[];

  @ApiProperty({ isArray: true, type: 'number'})
  @IsArray()
  readonly users: number[];
}
