import {Inject, Injectable} from '@nestjs/common';
import {CONNECTION_REPOSITORY} from '../../constants';
import {Repository} from 'typeorm';
import Connection from '../database/entities/connection.entity';
import {ConnectionData, DatabaseType} from './connections.interfaces';
import BaseRepositoryService from '../../base/baseRepository.service';
import {searchQuery} from '../../base/utils';

@Injectable()
export class ConnectionsRepositoryService extends BaseRepositoryService<Connection> {
  constructor(
    @Inject(CONNECTION_REPOSITORY)
    private readonly connectionRepository: Repository<Connection>,
  ) {
    super(connectionRepository);
  }

  create({ typeId, host, port, username, password, name, adminId, databaseName }) {
    const connection = new Connection();
    connection.admin_id = adminId;
    connection.type_id = typeId;
    connection.host = host;
    connection.port = port;
    connection.username = username;
    connection.password = password;
    connection.db_name = databaseName;
    connection.name = name;
    return this.connectionRepository.save(connection);
  }

  getById(id: number): Promise<Connection> {
    return this.connectionRepository.findOneBy({ id: id });
  }

  async getDataForConnectionCreating(id: number): Promise<ConnectionData> {
    const connection = await this.connectionRepository.findOne({
      where: { id },
      relations: ['type'],
    });
    if (!connection) {
      return null;
    }
    const { host, port, username, type: { name: typeName }, db_name, password, name } = connection;
    return { host, port, username, type: typeName as DatabaseType , database: db_name, password, name };
  }

  getByConnectionName(name: string): Promise<Connection> {
    return this.connectionRepository.findOneBy({ name });
  }

  getConnectionList(skip: number, itemsPerPage: number, search: string, admin: number): Promise<Connection[]> {
    return super.getPaginatedList({ skip, itemsPerPage, matcher: { admin_id: admin, name: searchQuery(search) } });
  }
}
