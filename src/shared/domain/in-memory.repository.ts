import { Entity } from "./entity";
import { Repository } from "./repository.interface";
import { ValueObject } from "./value-object";

export abstract class InMemoryRepository<T extends Entity, EntityId extends ValueObject> implements Repository<T, EntityId> {

    items: T[] = [];

    async insert(entity: any): Promise<void> {
        this.items.push(entity);
    }

    async bulkInsert(entity: any[]): Promise<void> {
        this.items.push(...entity);
    }

    async update(entity: any): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async delete(id: any): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async findById(id: any): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async findAll(): Promise<any[]> {
        throw new Error("Method not implemented.");
    }

    abstract getEntity(): new (...args: any[]) => any;
}