import { SortDirection } from "../../shared/domain/search-params";
import { InMemorySearchableRepository } from "../../shared/infra/in-memory.repository";
import { Category } from "../domain/category.entity";
import { Uuid } from "../domain/uuid.vo";

export class CategoryInMemoryRepository extends InMemorySearchableRepository<Category, Uuid> {

    sortableFields: string[] = ['name', 'create_at'];


    protected async applyFilter(items: Category[], filter: string): Promise<Category[]> {
        if (!filter) return items;
        return items.filter(i => i.name.toLowerCase().includes(filter.toLowerCase()));
    }

    getEntity(): new (...args: any[]) => Category {
        return Category;
    }

    protected applySort(items: Category[], sort: string | null, sort_dir: SortDirection | null) {
        return sort ? super.applySort(items, sort, sort_dir) : super.applySort(items, 'created_at', 'desc');
    }
}