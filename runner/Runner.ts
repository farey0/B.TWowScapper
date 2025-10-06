import { Arguments } from "../net/Arguments";
import { ItemQuality } from "../model/references/ItemQuality";
import { Filter } from "../net/Filter";
import { Weapon } from "../model/entity/item/Weapon/Weapon";
import { Parse } from "../scrapping/Parser";

export class Runner {

    static {
        Arguments.Add("fetch");
        Arguments.Add("save");
    }

    public static async Main() {
        const args = Bun.argv.slice(2);
        const parsedArgs = Arguments.Parse(args);

        //await Runner.newMethod();        

        //const data = await fetch("https://database.turtle-wow.org/?item=55504");

        const data = Bun.file("./test.html");
        const dataStr = await data.text();

        const weapon: Weapon = await Parse.Weapon(dataStr);        

        console.log(weapon);
    } 

    


    private static async newMethod() {
        var filter: Filter = new Filter();

        filter.SetItemQuality(ItemQuality.Poor);
        filter.SetMaxLevel(10);
        filter.SetMinLevel(10);


        const url = filter.GenerateUrl("2");

        const response = await fetch(url);
        console.log(url);
    }
}