import { Inject, Injectable } from '@nestjs/common';
import BaseRepositoryService from '../../base/baseRepository.service';
import { MODEL_ITEM_REPOSITORY } from '../../constants';
import { Repository } from 'typeorm';
import DataModelItem from '../database/entities/data-model-item.entity';

@Injectable()
export class ModelItemsRepositoryService extends BaseRepositoryService<DataModelItem> {
  constructor(
    @Inject(MODEL_ITEM_REPOSITORY)
    private readonly modelItemRepository: Repository<DataModelItem>,
  ) {
    super(modelItemRepository);
  }

  createModelItem(name, tableName, modelId, connectionManager) {
    const modelItem = new DataModelItem();
    modelItem.model_id = modelId;
    modelItem.name = name;
    modelItem.table_name = tableName;
    return connectionManager ? connectionManager.save(modelItem) : this.modelItemRepository.create(modelItem);
  }
}
