// The most basic bloc of an entity in the game

import { EntityError } from "../exceptions/EntityError";
import { EntityType } from "./EntityType";
import { Item } from "./Item";
import { Validator as Val } from "../../utils/Validator";

export abstract class Entity {
    private id: number;
    private name: string;
    private type: EntityType;

    public constructor() {}

    public SetId(id: number): void {
        Val.PosInt(id);

        this.id = id;
    }

    public SetName(name: string): void {
        Val.Str(name);

        this.name = name;
    }

    public SetType(type: EntityType): void {
        Val.Type(type, EntityType);

        this.type = type;
    }

    public GetId(): number {
        return this.id;
    }

    public GetName(): string {
        return this.name;
    }

    public GetType(): EntityType {
        return this.type;
    }

    public ToChild(entityType: EntityType): any {
        switch(entityType) {
            case EntityType.Item:
                return <Item><unknown>this;
            default:
                throw new EntityError("error.Entity.INVALID_TYPE");
        }
    }
}