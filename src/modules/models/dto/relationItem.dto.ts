import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RelationItem {
  @ApiProperty()
  @IsString()
  firstTableName: string;

  @ApiProperty()
  @IsString()
  firstTableColumn: string;

  @ApiProperty()
  @IsString()
  secondTableName: string;

  @ApiProperty()
  @IsString()
  secondTableColumn: string;
}
