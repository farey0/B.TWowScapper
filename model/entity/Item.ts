import { Entity } from "./Entity";
import { ItemType } from "./ItemType"
import { ItemQuality } from "../references/ItemQuality";
import { Validator as Val } from "../../utils/Validator";
import { Price } from "./references/Price";


export abstract class Item extends Entity {
    
    private itemType: ItemType;

    private level: number;
    private reqLevel: number;

    private description: string;

    private buyPrice?: Price;
    private sellPrice?: Price;
    
    private quality: ItemQuality;

    private bindsWhenPickedUp: boolean;

    private unique: boolean;

    public constructor() {
        super();
    }

    // -- Setters

    public SetItemType(itemType: ItemType): void {
        Val.Type(itemType, ItemType);

        this.itemType = itemType;
    }

    public SetLevel(level: number): void {
        Val.PosInt(level);

        this.level = level;
    }

    public SetReqLevel(reqLevel: number): void {
        Val.PosInt(reqLevel);
        Val.LessThan(reqLevel, 60);

        this.reqLevel = reqLevel;
    }

    public SetDescription(description: string): void {
        Val.Str(description);

        this.description = description;
    }

    public SetBuyPrice(buyPrice: Price): void {
        Val.Type(buyPrice, Price);

        this.buyPrice = buyPrice;
    }

    public SetSellPrice(sellPrice: Price): void {
        Val.Type(sellPrice, Price);

        this.sellPrice = sellPrice;
    }

    public SetQuality(quality: ItemQuality): void {
        Val.Type(quality, ItemQuality);

        this.quality = quality;
    }

    public SetBindsWhenPickedUp(bindsWhenPickedUp: boolean): void {
        Val.Bool(bindsWhenPickedUp);

        this.bindsWhenPickedUp = bindsWhenPickedUp;
    }

    public SetUnique(unique: boolean): void {
        Val.Bool(unique);

        this.unique = unique;
    }

    // -- Getters

    public GetItemType(): ItemType {
        return this.itemType;
    }

    public GetDescription(): string {
        return this.description;
    }

    public GetLevel(): number {
        return this.level;
    }

    public GetReqLevel(): number {
        return this.reqLevel;
    }

    private static defaultPrice = new Price(0, 0, 0);

    public GetBuyPrice(): Price {
        if(!this.buyPrice) return Item.defaultPrice;

        return this.buyPrice;
    }

    public GetSellPrice(): Price {
        if(!this.sellPrice) return Item.defaultPrice;

        return this.sellPrice;
    }

    public GetQuality(): ItemQuality {
        return this.quality;
    }

    public GetBindsWhenPickedUp(): boolean {
        return this.bindsWhenPickedUp;
    }

    public GetUnique(): boolean {
        return this.unique;
    }
}