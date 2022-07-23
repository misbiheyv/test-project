export default {
    isNotEmpty(str) {
        return this.trim(str).length > 0;
    },
    test(str, reg) {
        if (reg instanceof RegExp) return reg.test(this.trim(str));
        throw new TypeError('Pass string for test as 1 param and regular expression as second');
    },
    isNumber(str) {
        return !Number.isNaN(Number(this.trim(str)));
    },
    trim(str) {
        if (str?.length > 0)
            return str.trim()
        return '';
    },
    include(str, ...includes) {
        return includes.includes(str)
    },
    exclude(str, ...excludes) {
        return !excludes.include(str)
    }
}