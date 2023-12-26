import { ValueObject } from "./value-object";

export abstract class Entity{
    abstract toJSON(): any;
    abstract get entity_id(): ValueObject;
}