import { isNumberString } from "class-validator";
import { Entity } from "../entity";
import { ValueObject } from "../value-object";


export interface RepositoryInterface<E extends Entity, EntityId extends ValueObject>{ 

    insert(entity: E): Promise<void>;
    bulkInsert(entities: E[]): Promise<void>;
    update(entity: E): Promise<void>;
    delete(entity: E): Promise<void>;

    findById(id: EntityId): Promise<E>;
    findAll(): Promise<E[]>;


    getEntityName(): new(...args: any[]) => E;

    

}