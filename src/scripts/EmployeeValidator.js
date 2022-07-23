import Employee from "./Employee";
import validator from "./api/validator";

export default class EmployeeValidator {
    constructor(o) {
        if (o === undefined) return;
        if (o[Symbol.iterator]) {
            for (const [key, value] of o) {
                this[key] = value
            }
        }
    }

    validCheck(emp) {
        if (!emp instanceof Employee) {
            throw new TypeError('Passed argument is not instance of Employee')
        }

        const res = {}

        for (const f of Object.getOwnPropertyNames(new Employee())) {
            switch (f) {
                case 'name':
                    res[f] = this.#validName(emp[f])
                    break;
                case 'age':
                    res[f] = this.#validAge(emp[f])
                    break;
                case 'position':
                    res[f] = this.#validPosition(emp[f])
                    break;
                case 'expertise':
                    res[f] = this.#validExpertise(emp[f])
                    break;
                default:
                    res[f] = validator.isNotEmpty(emp[f])
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
        for (const [key, value] of this) {
            console.log(key, value)
            if (value === false) res.push(key)
        }
        return res.length > 0 ? res : undefined;
    }


    #validName(name) {
        return validator.isNotEmpty(name);
    }
    
    #validAge(age) {
        return validator.isNotEmpty(age) && validator.isNumber(age);
    }
    
    #validPosition(position) {
        return validator.isNotEmpty(position) && validator.exclude(position, 'не выбрано')
    }
    
    #validExpertise(text) {
        return validator.isNotEmpty(text);
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