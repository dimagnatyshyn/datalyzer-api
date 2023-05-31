import { Module } from '@nestjs/common';
import { ConnectionsController } from './connections.controller';
import { ConnectionsService } from './connections.service';
import { ConnectionsRepositoryService } from './connections-repository.service';
import { ConnectionTypeRepositoryService } from './connection-type-repository.service';
import { ConnectionManagerService } from './connection-manager.service';
import DatabaseModule from '../database';
import connectionsProviders from './connections.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ConnectionsController],
  providers: [
    ...connectionsProviders,
    ConnectionsService,
    ConnectionsRepositoryService,
    ConnectionTypeRepositoryService,
    ConnectionManagerService,
  ],
  exports: [ConnectionManagerService],
})
export class ConnectionsModule {}
