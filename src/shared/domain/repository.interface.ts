import { Entity } from "./entity";
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