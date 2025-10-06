export class Mapper {

    private mappings: Map<string, any> = new Map<string, any>();
    
    public constructor() {}

    public add(key: string, value: any) {
        this.mappings.set(key, value);
    }

    public get(key: string): any {
        return this.mappings.get(key);
    }

    public has(key: string): boolean {
        return this.mappings.has(key);
    }
}