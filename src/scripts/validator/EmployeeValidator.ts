import Validator from './Validator';

import { 

    IEmployee, 
    IEValidator, 
    IEValidatorOpts, 
    IEValidatorKey 

} from './interface'

export type { 

    IEmployee, 
    IEValidatorOpts 

}

export default class EmployeeValidator implements IEValidator {
    private validates: IEValidatorOpts = {
        name: false,
        age: false,
        position: false,
        expertise: false,
    };

    public get getResults() : IEValidatorOpts {
        return this.validates;
    }

    public get isValid(): boolean {
        return !Object.values(this.validates).includes(false);
    }

    constructor(opts: IEmployee) {
        for (const key of Object.keys(opts)) {
            const t = <IEValidatorKey>key;
            this.validates[t] = this[t](opts[t]);
        }
    }

    name(p: any) {
        return  Validator.isNotEmpty(p);
    }

    age(p: any) {
        return  Validator.isNotEmpty(p) &&
                Validator.isNumber(p);
    }

    position(p: any) {
        return  Validator.isNotEmpty(p) && 
                Validator.exclude(p, 'не выбрано');
    }

    expertise(p: any) {
        return  Validator.isNotEmpty(p);
    }
}