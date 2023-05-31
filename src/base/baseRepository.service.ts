import { BaseEntity, Repository } from 'typeorm';

export default class BaseRepositoryService<Entity extends BaseEntity> {
  constructor(
    public repository: Repository<Entity>,
  ) {}

  findById(id: number, options: object = {}): Promise<Entity> {
    // @ts-ignore
    return this.repository.findOne({ where: { id }, ...options});
  }

  findAll(options?: object): Promise<Entity[]> {
    return this.repository.find(options);
  }

  findOne(options: object): Promise<Entity> {
   return this.repository.findOne(options);
  }

  getPaginatedList({ skip, itemsPerPage, matcher, relations = [] }): Promise<Entity[]> {
    return this.repository.find({
      where: matcher,
      relations,
      skip,
      take: itemsPerPage,
    });
  }

  getCount(options: object): Promise<number> {
    return this.repository.count(options);
  }

  delete(matcher: object) {
    return this.repository.delete(matcher);
  }

  update(matcher: number | object, updateData: object) {
    return this.repository.update(matcher, updateData);
  }
}
