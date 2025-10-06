export enum HandPlacement {
    OneHanded = 0,
    TwoHanded = 1,
    OffHand = 2
}

export class HandPlacementUtils {
    public static FromString(str: string): HandPlacement {
        switch (str) {
            case "One-hand": return HandPlacement.OneHanded;
            case "Two-hand": return HandPlacement.TwoHanded;
            case "Held In Off-Hand": return HandPlacement.OffHand;
            default: throw new Error("Unknown hand placement: " + str);
        }
    }
}