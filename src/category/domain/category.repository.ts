import { Repository } from "../../shared/domain/repository.interface";
import { Category } from "./category.entity";
import { Uuid } from "./uuid.vo";

export interface CategoryRepository extends Repository<Category, Uuid> {
    
}