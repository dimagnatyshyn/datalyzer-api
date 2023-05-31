import {IsNumber, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class DeleteDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  deletionConfirmed: string;
}
