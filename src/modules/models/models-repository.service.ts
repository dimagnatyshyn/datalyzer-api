import { Inject, Injectable } from '@nestjs/common';
import BaseRepositoryService from '../../base/baseRepository.service';
import DataModel from '../database/entities/data-model.entity';
import { MODEL_REPOSITORY } from '../../constants';
import {EntityManager, Repository} from 'typeorm';
import DataModelItem from '../database/entities/data-model-item.entity';
import DataModelItemField from '../database/entities/data-model-item-field.entity';
import {searchQuery} from '../../base/utils';
import DataModelItemRelation from '../database/entities/data-model-item-relation.entity';
import Users from '../database/entities/user.entity';

@Injectable()
export class ModelsRepositoryService extends BaseRepositoryService<DataModel> {
  constructor(
    @Inject(MODEL_REPOSITORY)
    private readonly modelRepository: Repository<DataModel>,
  ) {
    super(modelRepository);
  }

  createModel(name: string, adminId: number, connectionId: number, users: Users[], connectionManager?: EntityManager) {
    const model = new DataModel();
    model.users = users;
    model.name = name;
    model.admin_id = adminId;
    model.db_connection_id = connectionId;
    return connectionManager ? connectionManager.save(model) : this.modelRepository.create(model);
  }

  getPaginatedModelList(skip: number, itemsPerPage: number, search: string, user: number, isAdmin: boolean) {
    return this.getUserTypeDependedQueryBuilder({ name: searchQuery(search) }, isAdmin, user)
      .skip(skip)
      .limit(itemsPerPage)
      .getRawMany();
  }

  getCount({ isAdmin, user}) {
    return this.getUserTypeDependedQueryBuilder({}, isAdmin, user)
      .getCount();
  }

  getUserTypeDependedQueryBuilder(params, isAdmin, user) {
    const query = this.getBaseModelQueryBuilder(params);
    if (isAdmin) {
      query.andWhere('model.admin_id = :user', { user });
    } else {
      query.innerJoin('model.users', 'users', 'users.id = :user', {user});
    }
    return query;
  }

  getModelsListForReport(user: number) {
    return this.modelRepository
      .createQueryBuilder('model')
      .select([
        'model.id',
        'model.name',
        'table.id',
        'table.name',
        'field.id',
        'field.type',
        'field.given_name',
        'relation.id',
      ])
      .innerJoin('model.modelItems', 'table')
      .innerJoin('table.fields', 'field')
      .leftJoin(
        DataModelItemRelation,
        'relation',
        'table.id = relation.second_model_item_id OR table.id = relation.first_model_item_id',
      )
      .innerJoin('model.users', 'users', 'users.id = :user', {user})
      .getRawMany();
  }
  private getBaseModelQueryBuilder(params) {
    return this.modelRepository
      .createQueryBuilder('model')
      .select([
        'model.name AS name',
        'model.id AS id',
        'model.created_at AS created',
        'model.active AS active',
        'connection.name AS connection',
        'COUNT(table.id) AS tables',
        'COUNT(field.id) AS fields',
      ])
      .where(params)
      .innerJoin('model.db_connection', 'connection')
      .innerJoin(DataModelItem, 'table', 'table.model_id = model.id')
      .innerJoin(DataModelItemField, 'field', 'field.model_item_id = table.id')
      .groupBy('model.created_at, model.name, connection.name, model.id, model.active');
  }
  modelInfo(id) {
    return this.getBaseModelQueryBuilder({ id }).getRawMany();
  }
}
