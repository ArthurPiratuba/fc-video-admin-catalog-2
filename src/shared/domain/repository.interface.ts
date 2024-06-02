import { Entity } from "./entity";
import { SearchParams } from "./search-params";
import { SearchResult } from "./search-result";
import { ValueObject } from "./value-object";

export interface Repository<T extends Entity, EntityId extends ValueObject> {
    insert(entity: T): Promise<void>;
    bulkInsert(entity: T[]): Promise<void>;
    update(entity: T): Promise<void>;
    delete(id: EntityId): Promise<void>;
    findById(id: EntityId): Promise<T | null>;
    findAll(): Promise<T[]>;
    getEntity(): new (...args: any[]) => T;
}

export interface SearchableRepository<
    E extends Entity,
    EntityId extends ValueObject,
    SearchInput = SearchParams,
    SearchOutput = SearchResult
> extends Repository<E, EntityId> {
    sortableFields: string[];
    search(props: SearchInput): Promise<SearchOutput>;
}