export default class Employee {
    name = '';
    age = 0;
    position = '';
    expertise = '';

    constructor(name, age, position, expertise) {
        this.name = name
        this.age = age
        this.position = position
        this.expertise = expertise
    }

    [Symbol.iterator]() {
        const keys = Object.getOwnPropertyNames(this)

        const iter = (function *(self) {
            for (const key of keys) {
                yield [key, self[key]];
            }
        })(this)

        return iter;
    }
}