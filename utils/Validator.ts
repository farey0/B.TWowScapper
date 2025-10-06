import { Is } from "./Is";

/**
 * @fileOverview Classe statique de gestion des validations - envoi une exception si la validation échoue
 * @author Flavien Leroyer
 * @exemple
 *      Validator.IsString("Hello");
 *      Validator.IsFunction(function(){});
 *      Validator.IsNotNull(null);
 */
export class Validator {
    static Bool(bindsWhenPickedUp: boolean) {
        if(!Is.Boolean(bindsWhenPickedUp))
            this.errorHandler("Value is not a boolean", "Validator.isBoolean");
    }

    // ------ Private members ------ //

    // Plante le programme en cas d'erreur
    // On prie que firefox nous donne un bon stack trace
    private static errorHandler = function (error: string, callSite: string) {
        new Error(error + " in " + callSite);
    }

    // ------ Public methods ------ //

    static LessThan(reqLevel: number, val: number) {
        if(reqLevel >= val)
            this.errorHandler("Value is not less than " + val, "Validator.lessThan");
    }

    /**
     * Fixe la méthode d'erreur qui sera appelée si une des méthodes de validation échoue
     * @param {function} handler - Fonction qui sera appelée en cas d'erreur
     * @example
     *      Validator.SetErrorHandler(function(error, callSite) {
     *          alert("Erreur : " + error + " in " + callSite);
     *      });
     */
    static SetErrorHandler(handler) {
        this.errorHandler = handler;
    }

    static Int(val: number) {
        this.NotNull(val);

        if(!Is.Integer(val))
            this.errorHandler("Value is not an integer", "Validator.isInt");
    }

    static PosInt(val: number) {
        this.NotNull(val);
        this.Int(val);

        if(val < 0)
            this.errorHandler("Value is not a positive integer", "Validator.isPosInt");
    }

    /**
     * Vérifie si la valeur est une chaîne de caractères
     * @param {*} value - La valeur à tester
     * @throws {Error} Si la valeur n'est pas une chaîne de caractères
     * @example
     *      Validator.IsString("Hello");
     */
    static Str(value) {
        this.NotNull(value);

        if(Is.String(value))
            this.errorHandler("Value is not a string", "Validator.isString");
    }

    /**
     * Vérifie si la valeur est une fonction
     * @param {*} value - La valeur à tester
     * @throws {Error} Si la valeur n'est pas une fonction
     * @example
     *      Validator.IsFunction(function(){});
     */
    static Func(value) {
        this.NotNull(value);

        if(!Is.Function(value))
            this.errorHandler("Value is not a function", "Validator.isFunction");
    }

    /**
     * Vérifie si la valeur n'est pas null
     * @param {*} value - La valeur à tester
     * @throws {Error} Si la valeur est null
     * @example
     *      Validator.IsNotNull(null);
     */
    static NotNull(value) {
        if(Is.Null(value))
            this.errorHandler("Value is null", "Validator.isNull");
    }

    /**
     * Vérifie si la valeur est de type type
     * @param {*} value - La valeur à tester
     * @param {Object} type - Le type à tester
     * @throws {Error} Si la valeur n'est pas de type type
     * @example
     *      Validator.IsType("Hello", String);
     */
    static Type(value, type) {
        this.NotNull(value);
        this.NotNull(type);

        if(!Is.OfType(value, type))
            this.errorHandler("Value is not a " + type.name, "Validator.IsType");
    }

    /**
     * Vérifie si la valeur est de l'un des types spécifiés
     * @param {*} value - La valeur à tester
     * @param {...Object} types - Les types à vérifier
     * @throws {Error} Si la valeur n'est pas d'un des types spécifiés
     * @example
     *      Validator.IsTypes("Hello", String, Number);
     */
    static Types(value, ...types) {
        this.NotNull(value);
        this.NotNull(types);

        let found = false;

        for (let i = 0; i < types.length; i++) {
            if (Is.OfType(value, types[i])) {
                found = true;
                break;
            }
        }

        if(!found)
            this.errorHandler("Value is not a " + types.join(" or "), "Validator.IsTypes");
    }
}

export class ValidatorError extends Error {
    constructor(message: string, cause?: Error) {
        if(cause === undefined) 
            super(message);
        else
            super(message, { cause : cause });

        this.name = "ValidatorError";
        Object.setPrototypeOf(this, ValidatorError.prototype);
    }

}