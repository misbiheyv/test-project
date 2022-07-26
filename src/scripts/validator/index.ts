import EmployeeValidator from './EmployeeValidator';

import type { IEmployee } from './EmployeeValidator';

export default function validator(o: IEmployee) : EmployeeValidator {
    return new EmployeeValidator(o)
}

export type {
    
    IEValidatorOpts, 
    IEmployee 

} from './EmployeeValidator';