import { Module } from '@nestjs/common';
import { provider } from './provider';

@Module({
  providers: [provider],
  exports: [provider],
})
export default class DatabaseModule {}
