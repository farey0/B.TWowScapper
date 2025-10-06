import { Entity } from "./Entity";
import { EntityType } from "./EntityType";
import { SpellType } from "./SpellType";

export class Spell extends Entity {
    private spellType: SpellType;

    public constructor(id: number, name: string) {
        super(id, name, EntityType.Spell);
    }

    public getSpellType(): SpellType {
        return this.spellType;
    }
}