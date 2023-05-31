import { BaseEntity } from 'typeorm';

export default (entitiesMock) => {
  return class RepositoryApiMock {
    public entitiesMock: BaseEntity[] = entitiesMock;

    public find = jest.fn((params: BaseEntity): Promise<BaseEntity[]> => {
      return Promise.resolve(this.entitiesMock);
    });

    public create = jest.fn((entity: BaseEntity): BaseEntity => {
      return this.entitiesMock[0];
    });

    public save = jest.fn((entity: BaseEntity): BaseEntity => {
      return entity;
    });

    public createQueryBuilder = jest.fn((alias: string): any => {
      return this;
    });

    public innerJoin = jest.fn((
      property: string,
      alias: string,
      condition: string,
      parameters: object ): any => {
      return this;
    });

    public getMany = jest.fn((): BaseEntity[] => {
      return entitiesMock;
    });

    public findOne = jest.fn((id: number): Promise<BaseEntity> => {
      return Promise.resolve(this.entitiesMock[0]);
    });
  };
};
