export class Price {
    private gold: number;
    private silver: number;
    private copper: number;

    public constructor(gold: number, silver: number, copper: number) {
        this.gold = gold;
        this.silver = silver;
        this.copper = copper;
    }

    public getGold(): number {
        return this.gold;
    }

    public getSilver(): number {
        return this.silver;
    }

    public getCopper(): number {
        return this.copper;
    }
}