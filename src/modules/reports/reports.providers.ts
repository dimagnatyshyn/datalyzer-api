import { Connection as TypeOPMConnection } from 'typeorm';
import {
  DB_CONNECTION,
  REPORT_ITEM_REPOSITORY,
  REPORT_REPOSITORY,
  REPORT_TYPE_REPOSITORY,
} from '../../constants';
import ReportItem from '../database/entities/report-item.entity';
import ReportType from '../database/entities/report-type.entity';
import Report from '../database/entities/report.entity';

export default [
  {
    provide: REPORT_REPOSITORY,
    useFactory: (connection: TypeOPMConnection) => connection.getRepository(Report),
    inject: [DB_CONNECTION],
  },
  {
    provide: REPORT_TYPE_REPOSITORY,
    useFactory: (connection: TypeOPMConnection) => connection.getRepository(ReportType),
    inject: [DB_CONNECTION],
  },
  {
    provide: REPORT_ITEM_REPOSITORY,
    useFactory: (connection: TypeOPMConnection) => connection.getRepository(ReportItem),
    inject: [DB_CONNECTION],
  },
];
