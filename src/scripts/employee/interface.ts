export interface IEmployee {
    name: string;
    position: string;
    age: EmployeeAge;
    expertise: string
}

export type EmployeeOptions = {
    name? : string,
    position? : string,
    age? : EmployeeAge,
    expertise? : string
}

export type EmployeeAge = 
    number | 
    string;

export type EmployeePosition = 
    EmptyPosition | 
    'аналитик' | 
    'программист' | 
    'менеджер';

export type EmptyPosition = 'не выбрано';