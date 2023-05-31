import {Inject, Injectable} from '@nestjs/common';
import {CONNECTION_TYPE_REPOSITORY} from '../../constants';
import {Repository} from 'typeorm';
import ConnectionType from '../database/entities/connectionType.entity';
import {DatabaseType} from './connections.interfaces';

@Injectable()
export class ConnectionTypeRepositoryService {
  constructor(
    @Inject(CONNECTION_TYPE_REPOSITORY)
    private readonly connectionTypeRepository: Repository<ConnectionType>,
  ) {}

  async checkIfExists(id: number): Promise<boolean> {
    const type = await this.connectionTypeRepository.findOneBy({ id });
    return !!type;
  }

  async getConnectionTypeName(id: number): Promise<DatabaseType> {
    const type = await this.connectionTypeRepository.findOne({
      where: { id },
      select: ['name'],
    });
    return type ? type.name as DatabaseType : null;
  }
}
