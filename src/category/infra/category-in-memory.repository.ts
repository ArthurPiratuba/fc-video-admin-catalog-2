import { InMemoryRepository } from "../../shared/infra/in-memory.repository";
import { Category } from "../domain/category.entity";
import { Uuid } from "../domain/uuid.vo";

export class CategoryRepositoryMemory extends InMemoryRepository<Category, Uuid> {

    getEntity(): new (...args: any[]) => Category {
        return Category;
    }
}