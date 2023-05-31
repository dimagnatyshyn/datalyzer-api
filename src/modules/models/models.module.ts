import { Module } from '@nestjs/common';
import { ModelsController } from './models.controller';
import { ModelsService } from './models.service';
import { ModelsRepositoryService } from './models-repository.service';
import { ModelItemsRepositoryService } from './model-items-repository.service';
import { ModelItemsFieldRepositoryService } from './model-items-field-repository.service';
import { ModelItemsRelationRepositoryService } from './model-items-relation-repository.service';
import DatabaseModule from '../database';
import modelsProviders from './models.providers';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [ModelsController],
  providers: [
    ...modelsProviders,
    ModelsService,
    ModelsRepositoryService,
    ModelItemsRepositoryService,
    ModelItemsFieldRepositoryService,
    ModelItemsRelationRepositoryService,
  ],
  exports: [ModelsService],
})
export class ModelsModule {}
