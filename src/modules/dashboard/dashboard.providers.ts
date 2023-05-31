import { Connection as TypeOPMConnection } from 'typeorm';
import {DB_CONNECTION, DASHBOARD_REPOSITORY} from '../../constants';
import Dashboard from '../database/entities/dashboard.entity';

export default [
  {
    provide: DASHBOARD_REPOSITORY,
    useFactory: (connection: TypeOPMConnection) => connection.getRepository(Dashboard),
    inject: [DB_CONNECTION],
  },
];
