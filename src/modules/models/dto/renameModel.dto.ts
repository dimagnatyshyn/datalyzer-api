import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RenameModelDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
