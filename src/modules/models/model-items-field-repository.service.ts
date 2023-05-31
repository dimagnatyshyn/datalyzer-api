import { Inject, Injectable } from '@nestjs/common';
import BaseRepositoryService from '../../base/baseRepository.service';
import { MODEL_ITEM_FIELD_REPOSITORY } from '../../constants';
import { In, Repository } from 'typeorm';
import DataModelItemField from '../database/entities/data-model-item-field.entity';
import { ModelRow } from './dto/modelRow.dto';

@Injectable()
export class ModelItemsFieldRepositoryService extends BaseRepositoryService<DataModelItemField> {
  constructor(
    @Inject(MODEL_ITEM_FIELD_REPOSITORY)
    private readonly modelItemFieldRepository: Repository<DataModelItemField>,
  ) {
    super(modelItemFieldRepository);
  }

  findOneById(id: number) {
   return this.modelItemFieldRepository.findOne({
     where: { id: id },
     relations: [ 'model_item' ]
   });
  }

  private formModelItemFieldEntity({ originalName, givenName, type, modelItemId }) {
    const modelItemField = new DataModelItemField();
    modelItemField.given_name = givenName;
    modelItemField.original_name = originalName;
    modelItemField.type = type;
    modelItemField.model_item_id = modelItemId;
    return this.modelItemFieldRepository.create(modelItemField);
  }

  async createModelItemFields(modelItemFieldsData: ModelRow[], modelItemId, connectionManager?) {
    const modelItemFields = await modelItemFieldsData.map(item =>
      this.formModelItemFieldEntity({ ...item, modelItemId }),
    );
    return connectionManager
      ? connectionManager.save(modelItemFields)
      : this.modelItemFieldRepository.save(modelItemFields);
  }

  getConnectionIdByModelItemFieldId(id: number) {
    return this.modelItemFieldRepository
      .createQueryBuilder('item')
      .select(['connection.id as id'])
      .where({ id })
      .innerJoin('item.model_item', 'table')
      .innerJoin('table.model', 'model')
      .innerJoin('model.db_connection', 'connection')
      .getRawOne();
  }

  getModelItemsFieldsData(ids: number[]) {
    return this.modelItemFieldRepository.find({
      select: ['id', 'original_name', 'given_name', 'type', 'model_item'],
      where: { id: In(ids) },
      relations: [ 'model_item'],
    });
  }
}
