// nao se faz regra de negocio em repository
// repository se preocupa apenas com armazenamento de dados

import { RepositoryInterface } from "../../shared/domain/respository/repository-interface";
import { Uuid } from "../../shared/domain/values-objects/uuid.vo";
import { Category } from "./category.entity";

export interface ICategoryRepository extends RepositoryInterface<Category, Uuid> {



}