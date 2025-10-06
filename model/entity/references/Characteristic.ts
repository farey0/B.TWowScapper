export enum Characteristic {
    Strength = 4,
    Stamina = 7,
    Intellect = 5,
    Spirit = 6,
    Agility = 3,
}

export class CharacteristicLine {
    private value: number;
    private Characteristic: Characteristic;

    public constructor(characteristic: Characteristic, value: number) {
        this.Characteristic = characteristic;
        this.value = value;
    }
    
    public GetValue(): number {
        return this.value;
    }
    
    public GetCharacteristic(): Characteristic {
        return this.Characteristic;
    }
}