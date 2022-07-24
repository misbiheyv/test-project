import Employee from "../employee/Employee";
import Validator from "./Validator";

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
        console.log(emp)
        res.name = this.validName(emp.name)
        res.age = this.validAge(emp.age)
        res.position = this.validPosition(emp.position)
        res.expertise = this.validExpertise(emp.expertise)

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

    private validName(name: string) {
        return Validator.isNotEmpty(name);
    }
    
    private validAge(age: number | string) {
        return Validator.isNotEmpty(age) && Validator.isNumber(String(age));
    }
    
    private validPosition(position: string) {
        return Validator.isNotEmpty(position) && Validator.exclude(position, 'не выбрано')
    }
    
    private validExpertise(text: string) {
        return Validator.isNotEmpty(text);
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