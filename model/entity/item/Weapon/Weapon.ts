import { Item } from "../../Item";
import { CharacteristicLine } from "../../references/Characteristic";
import { WeaponType } from "./WeaponType";
import { HandPlacement } from "./HandPlacement";
import { Validator as Val } from "../../../../utils/Validator";

export class Weapon extends Item {
    private weaponType: WeaponType;

    private dps: number;

    private minDamage: number;
    private maxDamage: number;
    private speed: number;

    private spellRefs: number[];

    private characteristicValues: CharacteristicLine[];

    private durability: number;

    private handPlacement: HandPlacement;

    public constructor(
    ) {
        super();
        this.spellRefs = [];
        this.characteristicValues = [];
    }

    // -- Setters -- //

    public SetWeaponType(weaponType: WeaponType): void {
        Val.Type(weaponType, WeaponType);

        this.weaponType = weaponType;
    }

    public SetDPS(dps: number): void {
        Val.PosInt(dps);

        this.dps = dps;
    }

    public SetMinDamage(minDamage: number): void {
        Val.PosInt(minDamage);

        this.minDamage = minDamage;
    }

    public SetMaxDamage(maxDamage: number): void {
        Val.PosInt(maxDamage);

        this.maxDamage = maxDamage;
    }

    public SetSpeed(speed: number): void {
        Val.PosInt(speed);

        this.speed = speed;
    }
    
    public SetSpellRefs(spellRefs: number[]): void {
        this.spellRefs = spellRefs;
    }

    public SetCharacteristicValues(characteristicValues: CharacteristicLine[]): void {
        this.characteristicValues = characteristicValues;
    }

    public SetDurability(durability: number): void {
        Val.PosInt(durability);

        this.durability = durability;
    }

    public SetHandPlacement(handPlacement: HandPlacement): void {
        Val.Type(handPlacement, HandPlacement);

        this.handPlacement = handPlacement;
    }

    // -- Getters -- //

    public GetWeaponType(): WeaponType {
        return this.weaponType;
    }

    public GetDPS(): number {
        return this.dps;
    }

    public GetMinDamage(): number {
        return this.minDamage;
    }

    public GetMaxDamage(): number {
        return this.maxDamage;
    }

    public GetSpeed(): number {
        return this.speed;
    }
    
    public GetSpellRefs(): readonly number[] {
        return this.spellRefs;
    }

    public GetCharacteristicValues(): readonly CharacteristicLine[] {
        return this.characteristicValues;
    }

    public GetDurability(): number {
        return this.durability;
    }

    public GetHandPlacement(): HandPlacement {
        return this.handPlacement;
    }    
}