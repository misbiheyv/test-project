export default {
    isNotEmpty(str: string | number) {
        return this.trim(str).length > 0;
    },
    test(str: string, reg: RegExp) {
        if (reg instanceof RegExp) return reg.test(this.trim(str));
        throw new TypeError('Pass string for test as 1 param and regular expression as second');
    },
    isNumber(str: string | number) {
        return !Number.isNaN(Number(this.trim(str)));
    },
    trim(str: string) {
        if (str?.length > 0)
            return str.trim()
        return '';
    },
    include(str: string, ...includes: string[]) {
        return includes.includes(str)
    },
    exclude(str: string, ...excludes: string[]) {
        return !excludes.includes(str)
    }
}