import { Entity } from "./entity";
import { NotFoundError } from "./errors/not-found.error";
import { Repository } from "./repository.interface";
import { ValueObject } from "./value-object";

export abstract class InMemoryRepository<T extends Entity, EntityId extends ValueObject> implements Repository<T, EntityId> {

    items: T[] = [];

    async insert(entity: T): Promise<void> {
        this.items.push(entity);
    }

    async bulkInsert(entity: T[]): Promise<void> {
        this.items.push(...entity);
    }

    async update(entity: T): Promise<void> {
        const indexFound = this.items.findIndex(item => item.entity_id.equals(entity.entity_id));
        if (indexFound === -1) throw new NotFoundError(entity.entity_id, this.getEntity());
        this.items[indexFound] = entity;
    }

    async delete(entity_id: EntityId): Promise<void> {
        const indexFound = this.items.findIndex(item => item.entity_id.equals(entity_id));
        if (indexFound === -1) throw new NotFoundError(entity_id, this.getEntity());
        this.items.splice(indexFound, 1);
    }

    async findById(entity_id: EntityId): Promise<T | null> {
        const item = this.items.find(item => item.entity_id.equals(entity_id));
        return typeof item === "undefined" ? null : item;
    }

    async findAll(): Promise<any[]> {
        return this.items;
    }

    abstract getEntity(): new (...args: any[]) => any;
}