import { Inject, Injectable } from '@nestjs/common';
import BaseRepositoryService from '../../base/baseRepository.service';
import { MODEL_ITEM_RELATION_REPOSITORY } from '../../constants';
import { Repository } from 'typeorm';
import DataModelItemRelation from '../database/entities/data-model-item-relation.entity';

@Injectable()
export class ModelItemsRelationRepositoryService extends BaseRepositoryService<DataModelItemRelation> {
  constructor(
    @Inject(MODEL_ITEM_RELATION_REPOSITORY)
    private readonly modelItemRelationRepository: Repository<DataModelItemRelation>,
  ) {
    super(modelItemRelationRepository);
  }

  createRelation({
    firstModelItemId,
    firstModelItemField,
    secondModelItemId,
    secondModelItemField,
    connectionManager,
  }) {
    const relation = new DataModelItemRelation();
    relation.first_model_item_id = firstModelItemId;
    relation.first_model_item_relation_field = firstModelItemField;
    relation.second_model_item_id = secondModelItemId;
    relation.second_model_item_relation_field = secondModelItemField;
    return connectionManager ? connectionManager.save(relation) : this.modelItemRelationRepository.save(relation);
  }

  getRelationByModelItems(firstModelItemId: number, secondModelItemId: number) {
    return this.modelItemRelationRepository.findOne({ where: [
        { first_model_item_id: firstModelItemId, second_model_item_id: secondModelItemId },
        { first_model_item_id: secondModelItemId, second_model_item_id: firstModelItemId },
    ]});
  }
}
