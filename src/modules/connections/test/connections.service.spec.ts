import { Test, TestingModule } from '@nestjs/testing';
import { ConnectionsService } from '../connections.service';
import { ConnectionManagerService } from '../connection-manager.service';
import { ConnectionsRepositoryService } from '../connections-repository.service';
import { ConnectionTypeRepositoryService } from '../connection-type-repository.service';
import { CreateConnectionDto } from '../dto/createConnection.dto';
import { ConnectionErrorMessage } from '../connections.interfaces';
import queries from '../../database/queries';

jest.mock('../connection-manager.service');

describe('ConnectionsService', () => {
  let service: ConnectionsService;
  const mockAdminId = 1;
  const mockRequestData: CreateConnectionDto = {
    name: 'name',
    port: '0000',
    host: 'host',
    databaseName: 'databaseName',
    password: 'password',
    username: 'username',
    typeId: 1,
  };
  let connectionManagerMock;
  let connectionRepositoryMock;
  let connectionTypeRepositoryMock;
  beforeEach(async () => {
    connectionManagerMock = {
      getConnection: jest.fn(),
    };
    ConnectionManagerService.isReachable = jest.fn().mockReturnValue(true);
    connectionRepositoryMock = {
      getByConnectionName: jest.fn().mockReturnValue(null),
      create: jest.fn(),
      getConnectionList: jest.fn(),
      getDataForConnectionCreating: jest.fn(),
      delete: jest.fn(),
    };
    connectionTypeRepositoryMock = {
      getConnectionTypeName: jest.fn().mockReturnValue(true),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: ConnectionManagerService, useValue: connectionManagerMock },
        { provide: ConnectionsRepositoryService, useValue: connectionRepositoryMock },
        { provide: ConnectionTypeRepositoryService, useValue: connectionTypeRepositoryMock },
        ConnectionsService,
      ],
    }).compile();

    service = module.get<ConnectionsService>(ConnectionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getConnectionsList', () => {
    it('should calculate proper skip value and send it to ConnectionRepositoryServer', () => {
      const skip = 10;
      service.getConnectionsList(2, 10, '', mockAdminId);
      expect(connectionRepositoryMock.getConnectionList).toBeCalledWith(skip, 10, '', mockAdminId);
    });
  });

  describe('createNewConnection', () => {
    it('should return proper error if connection name already exists', async () => {
      connectionRepositoryMock.getByConnectionName = jest.fn().mockReturnValue(true);
      try {
        await service.createNewConnection(mockRequestData, mockAdminId);
      } catch (e) {
        expect(e.message.error).toBe(ConnectionErrorMessage.NAME_IS_NOT_UNIQ);
      }
    });

    it("should return proper error if connection type doesn't exists", async () => {
      connectionTypeRepositoryMock.getConnectionTypeName = jest.fn().mockReturnValue(false);
      try {
        await service.createNewConnection(mockRequestData, mockAdminId);
      } catch (e) {
        expect(e.message.error).toBe(ConnectionErrorMessage.DATABASE_TYPE_DOES_NOT_EXISTS);
      }
    });

    it("should return proper error if connection can't be established", async () => {
      ConnectionManagerService.isReachable = jest.fn().mockReturnValue(false);
      try {
        await service.createNewConnection(mockRequestData, mockAdminId);
      } catch (e) {
        expect(e.message.error).toBe(ConnectionErrorMessage.CANNOT_ESTABLISH_CONNECTION);
      }
    });

    it('should return create connection entity if all the data is correct', async () => {
      const mockConnectionEntity = {};
      connectionRepositoryMock.create = jest.fn().mockReturnValue(mockConnectionEntity);
      const connection = await service.createNewConnection(mockRequestData, mockAdminId);
      expect(connection).toBe(mockConnectionEntity);
    });
  });

  describe('getConnectionTables', () => {
    it('should request tables and columns data and format it to proper format', async () => {
      const mockConnectionId = 1;
      const mockDbType = 'postgres';
      const mockTablesAndColumnsResponse = [
        { table: 'table1', column: 'column1', type: 'integer' },
        { table: 'table1', column: 'column2', type: 'integer' },
        { table: 'table2', column: 'column1', type: 'integer' },
        { table: 'table2', column: 'column2', type: 'integer' },
        { table: 'table3', column: 'column1', type: 'integer' },
        { table: 'table3', column: 'column2', type: 'integer' },
      ];
      const mockConnection = {
        query: jest.fn().mockReturnValue(mockTablesAndColumnsResponse),
      };
      const expectedResult = [
        {
          tableName: 'table1',
          columns: [{ name: 'column1', isNumeric: true }, { name: 'column2', isNumeric: true }],
        },
        { tableName: 'table2', columns: [{ name: 'column1', isNumeric: true }, { name: 'column2', isNumeric: true }] },
        { tableName: 'table3', columns: [{ name: 'column1', isNumeric: true }, { name: 'column2', isNumeric: true }] },
      ];
      connectionRepositoryMock.getDataForConnectionCreating.mockReturnValue({ type: mockDbType });
      connectionManagerMock.getConnection.mockReturnValue(mockConnection);
      const result = await service.getConnectionTables(mockConnectionId);
      expect(result).toStrictEqual(expectedResult);
      expect(connectionManagerMock.getConnection).toBeCalledWith(mockConnectionId);
      expect(connectionRepositoryMock.getDataForConnectionCreating).toBeCalledWith(mockConnectionId);
      expect(mockConnection.query).toBeCalledWith(queries.dataBaseSelectTablesAndColumnsQuery[mockDbType]);
    });
  });

  describe('getConnectionRelations', () => {
    it('should request relations data and format it to proper format', async () => {
      const mockConnectionId = 1;
      const mockDbType = 'postgres';
      const mockRelationsResponse = [
        {
          fk_column: 'fk_column',
          foreign_table: 'foreign_table',
          pk_column: 'pk_column',
          primary_table: 'primary_table',
        },
        {
          fk_column: 'fk_column1',
          foreign_table: 'foreign_table1',
          pk_column: 'pk_column1',
          primary_table: 'primary_table1',
        },
      ];
      const mockConnection = {
        query: jest.fn().mockReturnValue(mockRelationsResponse),
      };
      const expectedResult = [
        { fkColumn: 'fk_column', foreignTable: 'foreign_table', pkColumn: 'pk_column', primaryTable: 'primary_table' },
        {
          fkColumn: 'fk_column1',
          foreignTable: 'foreign_table1',
          pkColumn: 'pk_column1',
          primaryTable: 'primary_table1',
        },
      ];
      connectionRepositoryMock.getDataForConnectionCreating.mockReturnValue({ type: mockDbType });
      connectionManagerMock.getConnection.mockReturnValue(mockConnection);
      const result = await service.getConnectionRelations(mockConnectionId);
      expect(result).toStrictEqual(expectedResult);
      expect(connectionManagerMock.getConnection).toBeCalledWith(mockConnectionId);
      expect(connectionRepositoryMock.getDataForConnectionCreating).toBeCalledWith(mockConnectionId);
      expect(mockConnection.query).toBeCalledWith(queries.dataBaseRelationsQuery[mockDbType]);
    });
  });

  describe('deleteConnection', () => {
    it('should call delete method of repository service', async () => {
      const id = 1;
      await service.deleteConnection(id);
      expect(connectionRepositoryMock.delete).toBeCalledWith({ id });
    });
  });
});
