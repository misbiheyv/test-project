export default abstract class Validator {
    static isNotEmpty(str: string | number) {
        return this.trim(String(str)).length > 0;
    }

    static test(str: string, reg: RegExp) {
        if (reg instanceof RegExp) return reg.test(this.trim(str));
        throw new TypeError('Pass string for test as 1 param and regular expression as second');
    }

    static isNumber(str: string) {
        return !Number.isNaN(Number(this.trim(str)));
    }

    static trim(str: string) {
        if (str?.length > 0)
            return str.trim()
        return '';
    }

    static include(str: string, ...includes: string[]) {
        return includes.includes(str)
    }

    static exclude(str: string, ...excludes: string[]) {
        return !excludes.includes(str)
    }
}