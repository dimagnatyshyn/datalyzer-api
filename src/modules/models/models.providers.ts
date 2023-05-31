import { Connection as TypeOPMConnection } from 'typeorm';
import {
  DB_CONNECTION,
  MODEL_ITEM_FIELD_REPOSITORY,
  MODEL_ITEM_RELATION_REPOSITORY,
  MODEL_ITEM_REPOSITORY,
  MODEL_REPOSITORY,
} from '../../constants';
import DataModel from '../database/entities/data-model.entity';
import DataModelItem from '../database/entities/data-model-item.entity';
import DataModelItemField from '../database/entities/data-model-item-field.entity';
import DataModelItemRelation from '../database/entities/data-model-item-relation.entity';

export default [
  {
    provide: MODEL_REPOSITORY,
    useFactory: (connection: TypeOPMConnection) => connection.getRepository(DataModel),
    inject: [DB_CONNECTION],
  },
  {
    provide: MODEL_ITEM_REPOSITORY,
    useFactory: (connection: TypeOPMConnection) => connection.getRepository(DataModelItem),
    inject: [DB_CONNECTION],
  },
  {
    provide: MODEL_ITEM_FIELD_REPOSITORY,
    useFactory: (connection: TypeOPMConnection) => connection.getRepository(DataModelItemField),
    inject: [DB_CONNECTION],
  },
  {
    provide: MODEL_ITEM_RELATION_REPOSITORY,
    useFactory: (connection: TypeOPMConnection) => connection.getRepository(DataModelItemRelation),
    inject: [DB_CONNECTION],
  },
];
