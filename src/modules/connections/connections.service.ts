import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateConnectionDto} from './dto/createConnection.dto';
import Connection from '../database/entities/connection.entity';
import {ConnectionsRepositoryService} from './connections-repository.service';
import {ConnectionTypeRepositoryService} from './connection-type-repository.service';
import {ConnectionManagerService} from './connection-manager.service';
import {
  ConnectionErrorMessage, DatabaseType,
  FormattedRelationQueryResult,
  FormattedTableAndColumnQueryResult,
  RelationsQueryResult,
  TableAndColumnQueryResult,
} from './connections.interfaces';
import { formatRelationsResponse, formatTablesAndColumnsResponse } from './utils';
import queries from '../database/queries';
import {UpdateConnectionDto} from './dto/updateConnection.dto';

@Injectable()
export class ConnectionsService {
  constructor(
    private connectionManager: ConnectionManagerService,
    private connectionRepository: ConnectionsRepositoryService,
    private connectionTypeRepository: ConnectionTypeRepositoryService,
  ) {}

  async updateConnection(id: number, data: UpdateConnectionDto) {
    const connection = await this.connectionRepository.getById(id);
    const typeId = data.type || connection.type_id;

    if (data.name && data.name !== connection.name) {
      await this.checkNameUniqueness(data.name);
    }

    const connectionTypeName = await this.getConnectionType(typeId);
    const databaseName = data.databaseName || connection.db_name;

    const connectionBaseData = {
      name: data.name || connection.name,
      port: data.port || connection.port,
      host: data.host || connection.host,
      username: data.username || connection.username,
      password: data.password || connection.password,
    };

    const connectionData = { ...connectionBaseData, database: databaseName, type: connectionTypeName };
    const connectionEntityData = { ...connectionBaseData, db_name: databaseName, type_id: typeId };

    await this.checkIfCanEstablishConnection(connectionData);
    await this.connectionRepository.update(id, connectionEntityData);
    return this.connectionRepository.getById(id);
  }

  private async checkNameUniqueness(name: string) {
    const connectionWithSameName = await this.connectionRepository.getByConnectionName(name);
    if (connectionWithSameName) {
      throw new HttpException({
        error: ConnectionErrorMessage.NAME_IS_NOT_UNIQ,
      }, HttpStatus.BAD_REQUEST);
    }
  }

  private async getConnectionType(typeId: number): Promise<DatabaseType> {
    const connectionTypeName = await this.connectionTypeRepository.getConnectionTypeName(typeId);
    if (!connectionTypeName) {
      throw new HttpException({
        error: ConnectionErrorMessage.DATABASE_TYPE_DOES_NOT_EXISTS,
      }, HttpStatus.BAD_REQUEST);
    }
    return connectionTypeName;
  }

  async createNewConnection(data: CreateConnectionDto, admin: number): Promise<Connection> {
    await this.checkNameUniqueness(data.name);
    const connectionTypeName = await this.getConnectionType(data.typeId);
    const connectionData = {
      name: data.name,
      database: data.databaseName,
      port: data.port,
      host: data.host,
      username: data.username,
      password: data.password,
      type: connectionTypeName,
    };
    await this.checkIfCanEstablishConnection(connectionData);
    return this.connectionRepository.create({ ...data, adminId: admin});
  }

  private async checkIfCanEstablishConnection(data) {
    const isDatabaseReachable = await ConnectionManagerService.isReachable(data);
    if (!isDatabaseReachable) {
      throw new HttpException({
        error: ConnectionErrorMessage.CANNOT_ESTABLISH_CONNECTION,
      }, HttpStatus.BAD_REQUEST);
    }
  }

  getConnectionsList(page: number, itemsPerPage: number, search: string, admin: number) {
    const skip = (page - 1) * itemsPerPage;
    return this.connectionRepository.getConnectionList(skip, itemsPerPage, search, admin);
  }

  async getConnectionTables(id: number): Promise<FormattedTableAndColumnQueryResult[]> {
    const result = await this.execRawQuery<TableAndColumnQueryResult[]>(id, queries.dataBaseSelectTablesAndColumnsQuery);
    return formatTablesAndColumnsResponse(result);
  }

  async getConnectionRelations(id: number): Promise<FormattedRelationQueryResult[]> {
    const result = await this.execRawQuery<RelationsQueryResult[]>(id, queries.dataBaseRelationsQuery);
    return formatRelationsResponse(result);
  }

  async getConnectionsCount(admin: number) {
    const count = await this.connectionRepository.getCount({ admin_id: admin });
    return { count };
  }

  async isReachable(id: number) {
    const connection = await this.connectionManager.getConnection(id);
    if (!connection) {
      throw new HttpException({
        error: ConnectionErrorMessage.CANNOT_ESTABLISH_CONNECTION,
      },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async execRawQuery<T>(id: number, query: object): Promise<T> {
    const [ connection, connectionDescription ] = await Promise.all([
      this.connectionManager.getConnection(id),
      this.connectionRepository.getDataForConnectionCreating(id),
    ]);
    if (!connection || !connectionDescription) {
      throw new HttpException({
        error: ConnectionErrorMessage.CONNECTION_DOES_NOT_EXISTS,
      }, HttpStatus.BAD_REQUEST);
    }
    const rawQuery = query[connectionDescription.type];
    return connection.query(rawQuery);
  }

  deleteConnection(id: number) {
    return this.connectionRepository.delete({ id });
  }
}
