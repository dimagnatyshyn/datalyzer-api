import { Injectable } from '@nestjs/common';
import {ConnectionsRepositoryService} from './connections-repository.service';
import { Connection, ConnectionOptions, createConnection } from 'typeorm';
import {ConnectionData} from './connections.interfaces';

@Injectable()
export class ConnectionManagerService {
  private connections: Map<number, Connection> = new Map();
  constructor(
    private connectionRepository: ConnectionsRepositoryService,
  ) {}

  async getConnection(id: number): Promise<Connection> {
    let connection = this.connections.get(id);
    try {
      if (connection && connection.isConnected) {
        return connection;
      } else if (connection) {
        return await connection.connect();
      }
      const connectionData: ConnectionData = await this.connectionRepository.getDataForConnectionCreating(id);
      if (!connectionData) {
        return null;
      }
      connection = await createConnection(connectionData as ConnectionOptions);
      this.connections.set(id, connection);
      return connection;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  static async isReachable(connectionData: ConnectionData) {
    try {
      const connection = await createConnection(connectionData as ConnectionOptions);
      if (connection && connection.isConnected) {
        connection.close();
        return true;
      }
      return false;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
