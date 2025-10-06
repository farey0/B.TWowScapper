import { ItemQuality } from "../model/references/ItemQuality";
import { Constants } from "./Constants";
import { Field, FieldValidators } from "./Post/Field";
import { BasicStat, OtherStat } from "../model/references/Statistic";

export class Filter {

// ╔═══[ Constants ]══════════════════════════════════════════════════════════════════════╗

    private static levelChecker = (value: any) => {
        if(!(typeof value === "number")) {
            return null;
        }

        //max level : 60
        if(value > 60)
            value = 60;
        else if(value < 0)
            value = 0;
        
        return String(value);
    }

    private static statisticChecker = (value: any) => {
        const qualityIsEnumValue: boolean = (Object.values(BasicStat) as number[]).includes(value);

        if(qualityIsEnumValue) {
            return String(value);
        }

        return null;
    }

    private static otherStatisticChecker = (value: any) => {
        const qualityIsEnumValue: boolean = (Object.values(OtherStat) as number[]).includes(value);

        if(qualityIsEnumValue) {
            return String(value);
        }

        return null;
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝

// ╔═══[ Members ]════════════════════════════════════════════════════════════════════════╗

    // Allow to indicate if filters are on or off
    public filterValue: Field = new Field("filters", (value: any) => {
        if(!(typeof value === "string")) 
            return null;

        var str = value.trim();

        if(str == "on" || str == "off")
            return str;

        return null;
    }, "on");

    public minItemLevel: Field = new Field("item_level_min", Filter.levelChecker, 0);
    public maxItemLevel: Field = new Field("item_level_max", Filter.levelChecker, 0);

    public minReqLevel: Field = new Field("req_level_min", Filter.levelChecker, 0);
    public maxReqLevel: Field = new Field("req_level_max", Filter.levelChecker, 0);

    public stat1: Field = new Field("stat_1", Filter.statisticChecker, 0);
    public stat2: Field = new Field("stat_2", Filter.statisticChecker, 0);
    public stat3: Field = new Field("stat_3", Filter.statisticChecker, 0);

    public stat1Value: Field = new Field("value_1", FieldValidators.PositiveNumber, 0);
    public stat2Value: Field = new Field("value_2", FieldValidators.PositiveNumber, 0);
    public stat3Value: Field = new Field("value_3", FieldValidators.PositiveNumber, 0);

    public otherStat1: Field = new Field("other_stat_1", Filter.otherStatisticChecker, 0);
    public otherStat2: Field = new Field("other_stat_2", Filter.otherStatisticChecker, 0);
    public otherStat3: Field = new Field("other_stat_3", Filter.otherStatisticChecker, 0);

    public otherStat1Value: Field = new Field("other_value_1", FieldValidators.PositiveNumber, 0);
    public otherStat2Value: Field = new Field("other_value_2", FieldValidators.PositiveNumber, 0);
    public otherStat3Value: Field = new Field("other_value_3", FieldValidators.PositiveNumber, 0);

    public itemQuality: Field = new Field("item_quality_min", (quality) => {
        const qualityIsEnumValue: boolean = (Object.values(ItemQuality) as number[]).includes(quality);

        if(qualityIsEnumValue) {
            return String(quality);
        }

        return null;
    }, ItemQuality.Poor);

    private readonly fields: Field[] = [
        this.filterValue,
        this.minItemLevel,
        this.maxItemLevel,
        this.minReqLevel,
        this.maxReqLevel,
        this.itemQuality,
        this.stat1,
        this.stat2,
        this.stat3,
        this.stat1Value,
        this.stat2Value,
        this.stat3Value,
        this.otherStat1,
        this.otherStat2,
        this.otherStat3,
        this.otherStat1Value,
        this.otherStat2Value,
        this.otherStat3Value
    ];

    private readonly basicStats: Field[] = [
        this.stat1,
        this.stat2,
        this.stat3
    ]

    private readonly otherStats: Field[] = [
        this.otherStat1,
        this.otherStat2,
        this.otherStat3
    ]

// ╚══════════════════════════════════════════════════════════════════════════════════════╝

// ╔═══[ Constructors ]═══════════════════════════════════════════════════════════════════╗

    public constructor() {}

// ╚══════════════════════════════════════════════════════════════════════════════════════╝


// ╔═══[ Public ]═════════════════════════════════════════════════════════════════════════╗

    public GenerateUrl(item: string) : string {
        // we need to ensure items is not empty, as
        // it is a required parameter
        if(item == "") 
            throw new FilterError("Items is required");  

        // 
        var url: string = Constants.URL + "?items=" + item;

        if(!this.IsOn())
            return url;

        // build the url
        this.fields.forEach(field => {
            url += "&" + field.GetName() + "=" + field.GetValue();
        });

        return url;
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝

// ╔═══[ Getters ]════════════════════════════════════════════════════════════════════════╗

    public IsOn(): boolean {
        return this.filterValue.GetValue() == "on";
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝

// ╔═══[ Setters ]════════════════════════════════════════════════════════════════════════╗

    public SetItemQuality(Uncommon: ItemQuality) {
        this.itemQuality.SetValue(Uncommon);
    }

    public SetMaxLevel(arg0: number) {
        this.maxItemLevel.SetValue(arg0);
    }

    public SetMinLevel(arg0: number) {
        this.minItemLevel.SetValue(arg0);
    }

    public SetMinReqLevel(arg0: number) {
        this.minReqLevel.SetValue(arg0);
    }

    public SetMaxReqLevel(arg0: number) {
        this.maxReqLevel.SetValue(arg0);
    }

    public AddBasicStat(stat : BasicStat, value: number) {
        // test if a basic stat is available (so 0)

        var index: number = 0;

        for(var i = 0; i < this.basicStats.length; i++) {
            if(!(this.basicStats[i].GetValue() === "0")) {
                this.basicStats[i].SetValue(stat);
                this.basicStats[i].SetValue(value);
                break;
            }
        }

        if(index == this.basicStats.length) 
            throw new FilterError("error.Filter.NO_MORE_BASIC_STATS");
    }

    public AddOtherStat(stat : OtherStat, value: number) {
        // test if a basic stat is available (so 0)

        var index: number = 0;

        for(var i = 0; i < this.otherStats.length; i++) {
            if(!(this.otherStats[i].GetValue() === "0")) {
                this.otherStats[i].SetValue(stat);
                this.otherStats[i].SetValue(value);
                break;
            }
        }

        if(index == this.otherStats.length) 
            throw new FilterError("error.Filter.NO_MORE_OTHER_STATS");
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝

// ╔═══[ Private ]════════════════════════════════════════════════════════════════════════╗

// ╚══════════════════════════════════════════════════════════════════════════════════════╝

}

class FilterError extends Error {
    public constructor(message: string) {
        super(message);
    }
}