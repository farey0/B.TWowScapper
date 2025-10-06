import { ItemQuality } from "../references/ItemQuality";
import { Entity } from "./Entity";
import { EntityType } from "./EntityType";
import { Item } from "./Item";
import { HandPlacement } from "./item/Weapon/HandPlacement";
import { Weapon } from "./item/Weapon/Weapon";
import { WeaponType } from "./item/Weapon/WeaponType";
import { ItemType } from "./ItemType";
import { Price } from "./references/Price";

export class EntityFactory {

    private static SetEntity(entity: Entity, id: number, name: string, type: EntityType) {
        entity.SetId(id);
        entity.SetName(name);
        entity.SetType(type);
    }

    private static SetEntityViaMap(entity: Entity, args: Map<string, any>) {
        this.SetEntity(entity, args.get("id"), args.get("name"), args.get("type"));
    }
    
    private static SetItem(item: Item, itemType: ItemType, level: number, reqLevel: number, description: string, buyPrice: Price, sellPrice: Price, quality: ItemQuality, bindsWhenPickedUp: boolean, unique: boolean) {
        item.SetItemType(itemType);
        item.SetLevel(level);
        item.SetReqLevel(reqLevel);
        item.SetDescription(description);
        item.SetBuyPrice(buyPrice);
        item.SetSellPrice(sellPrice);
        item.SetQuality(quality);
        item.SetBindsWhenPickedUp(bindsWhenPickedUp);
        item.SetUnique(unique);
    }

    private static SetItemViaMap(item: Item, args: Map<string, any>) {
        this.SetItem(item, args.get("itemType"), args.get("level"), args.get("reqLevel"), args.get("description"), 
        args.get("buyPrice"), args.get("sellPrice"), args.get("quality"), args.get("bindsWhenPickedUp"), args.get("unique"));
    }

    private static  SetWeapon(weapon: Weapon, weaponType: WeaponType, dps: number, minDamage: number, maxDamage: number, speed: number, 
        durability: number, handPlacement: HandPlacement) {
        weapon.SetWeaponType(weaponType);
        weapon.SetDPS(dps);
        weapon.SetMinDamage(minDamage);
        weapon.SetMaxDamage(maxDamage);
        weapon.SetSpeed(speed);
        weapon.SetDurability(durability);
        weapon.SetHandPlacement(handPlacement);
    }

    private static SetWeaponViaMap(weapon: Weapon, args: Map<string, any>) {
        this.SetWeapon(weapon, args.get("weaponType"), args.get("dps"), args.get("minDamage"), args.get("maxDamage"), args.get("speed"), 
        args.get("durability"), args.get("handPlacement"));
    }
}