
/**
 * @fileOverview Classe statique de test de type de données
 * @author Flavien Leroyer
 * @example
 *      Is.String("Hello");
 *      Is.Array([1,2,3]);
 *      Is.Function(function(){});
 *      Is.Null(null);
 *      Is.Boolean(true);
 */

export class Is {
    static Boolean(bindsWhenPickedUp: boolean): boolean {
        return this.OfType(bindsWhenPickedUp, Boolean);
    }

    static Integer(val: number): boolean {
        return this.OfType(val, Number) && Number.isInteger(val);
    }
    static Number(val: number): boolean {
        return this.OfType(val, Number);
    }

    private constructor() {}

    /**
     * @function
     * @description Vérifie si value est un tableau (Array)
     * @param {*} value - La valeur à tester
     * @returns {boolean} true si value est un tableau, false sinon
     */
    static Array(value) {
        return Array.isArray(value);
    }

    /**
     * @function
     * @description Vérifie si value est null
     * @param {*} value - La valeur à tester
     * @returns {boolean} true si value est null, false sinon
     */
    static Null(value) {
        return value === null;
    }

    /**
     * @function
     * @description Vérifie si value est une chaîne de caractères (String)
     * @param {*} value - La valeur à tester
     * @returns {boolean} true si value est une chaîne de caractères, false sinon
     */
    static String(value) {
        return this.OfType(value, String);
    }

    /**
     * @function
     * @description Vérifie si value est une fonction (Function)
     * @param {*} value - La valeur à tester
     * @returns {boolean} true si value est une fonction, false sinon
     */
    static Function(value) {
        return this.OfType(value, Function);
    }

    /**
     * @function
     * @description Vérifie si element est un objet (Object)
     * @param {*} element - La valeur à tester
     * @returns {boolean} true si element est un objet, false sinon
     */
    static Object(element) {
        return this.OfType(element, Object);
    }

    /**
     * @function
     * @description Vérifie si element est une collection HTML (HTMLCollection)
     * @param {*} element - La valeur à tester
     * @returns {boolean} true si element est une collection HTML, false sinon
     */
    static HTMLCollection(element) {
        return this.OfType(element, HTMLCollection);
    }

    /**
     * @function
     * @description Vérifie si element est de type classType
     * @param {*} element - La valeur à tester
     * @param {Object} classType - Le type à tester
     * @returns {boolean} true si element est de type classType, false sinon
     */
    static OfType(element, classType) {
        return element instanceof classType || typeof element === classType.constructor.name;
    }

    /**
     * @function
     * @description Vérifie si type est une classe (fonction dont le prototype est en lecture seule)
     * @param {function} type - La classe à tester
     * @returns {boolean} true si type est une classe, false sinon
     */
    static Class(type) {
        return typeof type === 'function' &&
            Object.getOwnPropertyDescriptor(
                type,
                'prototype'
            )?.writable === false
    }
}