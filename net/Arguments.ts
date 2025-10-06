import { Static } from "../utils/Utils";

export class Argument {
    
    private readonly name: string;
    private value: string | null = null;

    public constructor(name: string, value: string) {
        this.name = name;
        this.value = value;
    }

    public HasValue(): boolean {
        if(this.value) 
            return true;
        else 
            return false;
    }

    public GetValue(): string {
        if(this.value) 
            return this.value;
        else 
            return "";
    }

    public GetName(): string {
        return this.name;
    }
}

export class Arguments extends Static {
    private static readonly args: Argument[] = [];
    private static delimiter: string = "=";


    public static Add(name: string): void {
        this.args.push(new Argument(name, ""));
    }

    public static SetDelimiter(delimiter: string): void {
        this.delimiter = delimiter;
    }

    public static Parse(args: string[]): ParsedArgs {
        var out: Argument[] = [];

        for (const arg of args) {
            const [name, value] = arg.split(this.delimiter);
            const argObj = this.args.find((a) => a.GetName() === name);

            if (argObj) {
                out.push(new Argument(name, value));
            }
        }

        return new ParsedArgs(out);
    }
}

export class ParsedArgs {
    private args: Argument[]

    public constructor(args: Argument[]) {
        this.args = args;
    }

    public HasArg(name: string): boolean {
        return this.args.find((a) => a.GetName() === name) ? true : false;
    }

    public GetArg(name: string): Argument {
        var arg = this.args.find((a) => a.GetName() === name);

        if (arg) 
            return arg;
        else 
            return new Argument(name, "");
    }
}