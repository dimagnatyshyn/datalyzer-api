import { IsArray, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ModelRow } from './modelRow.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ModelItem {
  @ApiProperty()
  @IsString()
  tableName: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ type: [ModelRow] })
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => ModelRow)
  rows: ModelRow[];
}
