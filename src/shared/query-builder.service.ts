import { Inject, Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';

@Injectable()
export class QueryBuilderService {
  constructor(@Inject(EntityManager) private readonly em: EntityManager) {}

  async buildQuery<T>(
    entityFactory: () => T,
    query: Record<string, any>,
  ): Promise<T[]> {
    const qb = this.em.createQueryBuilder(entityFactory().constructor.name);
    // Apply filters
    if (query.filter) {
      this.applyFilters(qb, query.filter);
    }

    // Apply sorts
    if (query.sort) {
      this.applySorts(qb, query.sort);
    }

    // Apply includes
    if (query.include) {
      this.applyIncludes(qb, query.include);
    }

    // Apply pagination
    if (query.page && query.limit) {
      const offset = (query.page - 1) * query.limit;
      qb.offset(offset).limit(query.limit);
    }

    // Execute the query
    const result = await qb.getResultList();
    return result as T[];
  }

  private applyFilters(qb: any, filter: Record<string, any>): void {
    Object.entries(filter).forEach(([field, value]) => {
      qb.andWhere({ [field]: value });
    });
  }

  private applySorts(qb: any, sort: Record<string, 'asc' | 'desc'>): void {
    Object.entries(sort).forEach(([field, order]) => {
      qb.orderBy({ [field]: order });
    });
  }

  private applyIncludes(qb: any, include: string[]): void {
    include.forEach((entity) => {
      qb.populate(entity);
    });
  }

  // Add more methods for applying locks, complex conditions, etc. if needed
}
