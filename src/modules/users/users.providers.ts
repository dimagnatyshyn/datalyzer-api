import { Connection } from 'typeorm';
import User from '../database/entities/user.entity';
import UserType from '../database/entities/userType.entity';
import {DB_CONNECTION, USER_REPOSITORY, USER_TYPE_REPOSITORY} from '../../constants';

export default [
  {
    provide: USER_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: [DB_CONNECTION],
  },
  {
    provide: USER_TYPE_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(UserType),
    inject: [DB_CONNECTION],
  },
];
