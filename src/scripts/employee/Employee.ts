import type {

    EmployeeOptions,
    IEmployee,
    EmployeeAge

} from './interface';

export default class Employee implements IEmployee {
    name = '';
    position : string = 'не выбрано';
    age : EmployeeAge;
    expertise = '';

    constructor(opts?: EmployeeOptions) {
        this.name = opts.name
        this.age = opts.age
        this.position = opts.position
        this.expertise = opts.expertise
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
};

export { EmployeeOptions };