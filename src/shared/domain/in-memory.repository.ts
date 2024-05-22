import { Entity } from "./entity";
import { Repository } from "./repository.interface";
import { ValueObject } from "./value-object";

export abstract class InMemoryRepository<T extends Entity, EntityId extends ValueObject> implements Repository<T, EntityId> {

    protected items: T[] = [];

    async insert(entity: T): Promise<void> {
        this.items.push(entity);
    }

    async bulkInsert(entity: T[]): Promise<void> {
        this.items.push(...entity);
    }

    async update(entity: T): Promise<void> {
        const indexFound = this.items.findIndex(item => item.entity_id.equals(entity.entity_id));
        if (indexFound === -1) throw new Error("Entity not found");
        this.items[indexFound] = entity;
    }

    async delete(id: EntityId): Promise<void> {
        const indexFound = this.items.findIndex(item => item.entity_id.equals(id));
        if (indexFound === -1) throw new Error("Entity not found");
        this.items.splice(indexFound, 1);
    }

    async findById(id: EntityId): Promise<T | null> {
        const item = this.items.find(item => item.entity_id.equals(id));
        return typeof item === "undefined" ? null : item;
    }

    async findAll(): Promise<any[]> {
        throw new Error("Method not implemented.");
    }

    abstract getEntity(): new (...args: any[]) => any;
}