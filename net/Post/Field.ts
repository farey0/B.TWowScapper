export class Field {
    private name: string;
    private value: string | null;
    private validator: FieldValidator;

    public constructor(name: string, validator: FieldValidator, value: any = null) {
        this.name = name;
        this.validator = validator;

        if(value !== null)
            this.SetValue(value);
        else
            this.value = null;
    }

    public HasValue(): boolean {
        if (this.value !== null)
            return true;
        else
            return false;
    }

    public GetValue(): string {
        if (this.value !== null)
            return this.value;
        else
            throw new Error("error.Field.NO_VALUE at " + this.name);
    }

    public GetName(): string {
        return this.name;
    }

    public SetValue(value: any): void {
        this.value = this.validator(value);

        if (this.value === null)
            throw new Error("error.Field.INVALID_VALUE at " + this.name);
    }
}

export type FieldValidator = (value: any) => string | null;



export class FieldValidators  {
    public static String(value: any): string | null {
        if (typeof value === "string")
            return value;
        else
            return null;
    }

    public static Number(value: any): string | null {
        if (typeof value === "number")
            return this.String(value);
        
        return null;
    }

    public static Boolean(value: any): string | null {
        if (typeof value === "boolean")
            if(value)
                return "true";
            else 
                return "false";
        
        return null;
    }

    public static PositiveNumber(value: any): string | null {
        if (typeof value === "number" && value >= 0)
            return String(value);
        
        return null;
    }
};