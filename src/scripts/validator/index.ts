import EmployeeValidator from './EmployeeValidator';

export default function validator(o: any) : EmployeeValidator {
    return new EmployeeValidator(o)
}