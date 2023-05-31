import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ModelRow {
  @ApiProperty()
  @IsString()
  originalName: string;

  @ApiProperty()
  @IsString()
  givenName: string;

  @ApiProperty()
  @IsString()
  type: string;
}
