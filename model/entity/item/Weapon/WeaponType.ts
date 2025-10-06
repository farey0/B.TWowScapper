export enum WeaponType {
    OneHandedAxes = 0,
    TwoHandedAxes = 1,
    Bows = 2,
    Guns = 3,
    OneHandedMaces = 4,
    TwoHandedMaces = 5,
    Polearms = 6,
    OneHandedSwords = 7,
    TwoHandedSwords = 8,
    Staves = 10,
    FistWeapons = 13,
    Miscellaneous = 14,
    Daggers = 15,
    Thrown = 16,
    Crossbows = 18,
    Wands = 19,
    FishingPoles = 20
}

export class WeaponTypeUtils {
    public static FromString(str: string, isTwoHanded: boolean): WeaponType {
        switch (str) {
            case "Axe": return isTwoHanded ? WeaponType.TwoHandedAxes : WeaponType.OneHandedAxes;
            case "Mace": return isTwoHanded ? WeaponType.TwoHandedMaces : WeaponType.OneHandedMaces;
            case "Sword": return isTwoHanded ? WeaponType.TwoHandedSwords : WeaponType.OneHandedSwords;
            case "Fist": return WeaponType.FistWeapons;
            case "Dagger": return WeaponType.Daggers;
            case "Thrown": return WeaponType.Thrown;
            default: throw new Error("Unknown weapon type: " + str);
        }
    }
}