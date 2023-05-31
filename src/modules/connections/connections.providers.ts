import { Connection as TypeOPMConnection } from 'typeorm';
import {CONNECTION_REPOSITORY, DB_CONNECTION, CONNECTION_TYPE_REPOSITORY} from '../../constants';
import ConnectionType from '../database/entities/connectionType.entity';
import Connection from '../database/entities/connection.entity';

export default [
  {
    provide: CONNECTION_REPOSITORY,
    useFactory: (connection: TypeOPMConnection) => connection.getRepository(Connection),
    inject: [DB_CONNECTION],
  },
  {
    provide: CONNECTION_TYPE_REPOSITORY,
    useFactory: (connection: TypeOPMConnection) => connection.getRepository(ConnectionType),
    inject: [DB_CONNECTION],
  },
];
