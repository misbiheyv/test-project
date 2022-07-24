export default class Employee {
    name = '';
    position = '';
    age : number | string = 0;
    expertise = '';

    constructor(
        name? : string, 
        position? : string, 
        age? : number | string, 
        expertise? : string
    ) {
        this.name = name
        this.age = age
        this.position = position
        this.expertise = expertise
    }

    [Symbol.iterator]() {
        const keys = Object.getOwnPropertyNames(this)

        const iter = (function *(self: any) {
            for (const key of keys) {
                yield [key, self[key]];
            }
        })(this)

        return iter;
    }
}