import Employee from "./Employee";
import validator from "./api/validator";

export default class EmployeeValidator {
    name: boolean;
    age: boolean;
    position: boolean;
    expertise: boolean;
    temp: any = {};

    constructor(o? : Iterable<any>) {
        if (o === undefined) return;
        if (o[Symbol.iterator]) {
            for (const [key, value] of o) {
                this.temp[key] = value;
            }
        }
    }

    validCheck(emp: Employee) {
        const res: any = {}

        for (const f of Object.getOwnPropertyNames(new Employee())) {
            switch (f) {
                case 'name':
                    res[f] = this.#validName(emp[f])
                    break;
                case 'age':
                    res[f] = this.#validAge(emp[f])
                    break;
                case 'position':
                    console.log(emp, emp[f])
                    res[f] = this.#validPosition(emp[f])
                    break;
                case 'expertise':
                    res[f] = this.#validExpertise(emp[f])
                    break;
                default:
                    // res[f] = validator.isNotEmpty(emp[f])
                    break;
            }
        }

        res[Symbol.iterator] = () => {
            return (function *() {
                for (const key of Object.getOwnPropertyNames(res)) {
                    yield [key, res[key]]
                }
            })()
        }

        return new EmployeeValidator(res)
    }

    getInvalids() {
        const res = []
        for (const key in this.temp) {
            if (this.temp[key] === false) res.push(key)
        }
        return res.length > 0 ? res : undefined;
    }


    #validName(name: string) {
        return validator.isNotEmpty(name);
    }
    
    #validAge(age: number | string) {
        return validator.isNotEmpty(age) && validator.isNumber(age);
    }
    
    #validPosition(position: string) {
        return validator.isNotEmpty(position) && validator.exclude(position, 'не выбрано')
    }
    
    #validExpertise(text: string) {
        return validator.isNotEmpty(text);
    }

    [Symbol.iterator]() {
        const keys = Object.getOwnPropertyNames(this)

        const iter = (function *(self) {

            for (const key of self) {
                yield [key, self[key]];
            }
        })(this.temp)

        return iter;
    }
}