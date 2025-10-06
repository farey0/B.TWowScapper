
import { Weapon } from "../model/entity/item/Weapon/Weapon";
import { ItemQuality } from "../model/references/ItemQuality";
import * as htmlparser2 from "htmlparser2";
import * as domutils from "domutils";
import { HandPlacement, HandPlacementUtils } from "../model/entity/item/Weapon/HandPlacement";
import { WeaponTypeUtils } from "../model/entity/item/Weapon/WeaponType";
import { BasicStat } from "../model/references/Statistic";


export class Parse {
    
    private constructor() {}

    public static async Weapon(data: string): Promise<Weapon> {
        var id, level, reqLevel, buyPrice, sellPrice,  weaponType, dps, minDamage, maxDamage, speed, durability : number = 0;
        var name, description: string = "";
        var itemQuality: ItemQuality = ItemQuality.Poor;
        var bindsWhenPickedUp: boolean = false;
        var handPlacement: HandPlacement = HandPlacement.OneHanded;
        var characteristics: Map<BasicStat, number> = new Map<BasicStat, number>();
        

        const dom = htmlparser2.parseDocument(data);

        const infoboxSpacer = domutils.getElementsByClassName("infobox-spacer", dom, true, 1)[0];

        if(infoboxSpacer === null)
            throw new Error("No infobox found");

        const infoboxTable = domutils.nextElementSibling(infoboxSpacer);

        if(infoboxTable === null)
            throw new Error("No infobox table found");

        const infoboxTableDivs = domutils.getElementsByTagName("div", infoboxTable, true);

        var weaponArgs: Map<string, string | number> = new Map<string, string | number>();

        for(var i = 0; i < infoboxTableDivs.length; i++) {
            const div = infoboxTableDivs[i];

            //console.log(domutils.textContent(div).trim());

            Parse.Infobox(domutils.textContent(div).trim(), weaponArgs);
        
        }

        const textDiv = domutils.getElementsByClassName("text", dom, true, 1)[0];

        if(textDiv === null)
            throw new Error("No text div found");

        const itemNameH1 = domutils.getElementsByTagName("h1", textDiv, true)[0];

        if(itemNameH1 === null)
            throw new Error("No item name h1 found");

        name = domutils.textContent(itemNameH1).trim();

        const allTd = domutils.getElementsByTagName("td", textDiv, true);

        const firstTd = allTd[1];

        const secondTd = allTd[allTd.length - 1];

        //console.log("first td: " + domutils.getText(firstTd).trim());
        //console.log("second td: " + domutils.getText(secondTd).trim());

        var values: string[] = Parse.CutStrings(domutils.getText(firstTd).trim());

        //console.log(weaponArgs);

        bindsWhenPickedUp = values[1] == "Binds when picked up";
        itemQuality = ItemQuality[values[2]];
        handPlacement = HandPlacementUtils.FromString(values[3]);
        weaponType = WeaponTypeUtils.FromString(values[4], handPlacement == HandPlacement.TwoHanded);

        minDamage = parseInt(values[5].split("-")[0].trim());
        maxDamage = parseInt(values[5].split("-")[1].replace("Damage", "").trim());

        speed = parseFloat(values[6].replace("Speed", "").trim());
        dps = parseFloat(values[7].split(" ")[0].replace("(", "").trim());

        level = weaponArgs.has("level") ? weaponArgs.get("level") as number : 0;

        // now till there is + at first char it means it's a characteristic
        var i = 8;

        while(values[i].charAt(0) == "+") {
            const splitted = values[i].split(" ");

            const stats = parseInt(splitted[0].replace("+", "").trim());

            characteristics.set(BasicStat[splitted[1].trim()], stats);

            i++;
        }


        return new Weapon(id, name, description, level, reqLevel, buyPrice, sellPrice, 
            itemQuality, bindsWhenPickedUp, weaponType, dps, minDamage, maxDamage, speed, durability, handPlacement);
    }

    private static CutStrings(content: string) {
        var out: string[] = [];

        content.split("\n").forEach(line => {
            const trimmed = line.trim();

            if(trimmed !== "")
                out.push(trimmed);
        });

        return out;
    }

    private static Infobox(content: string, weaponArgs: Map<string, string | number>) {
        
        switch(content.charAt(0).toUpperCase()) {
            case 'L':
                if(content.startsWith("Level: ")) {
                    Parse.Convert(content, "Level: ", "level", true, weaponArgs);
                }
                break;
            
        }
    }

    private static Convert(content: string, prefix: string, propertyName: string, isNumber: boolean, weaponArgs: Map<string, string | number>) {
        const trimmed = content.replace(prefix, "").trim();

        if(trimmed === "")
            return;

        weaponArgs.set(propertyName, isNumber ? parseInt(trimmed) : trimmed);
    }
}