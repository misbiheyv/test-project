import Utils from "@scripts/Utils";

import { rowsFilter, addNewEmployee } from './table';

import Employee from "@scripts/employee";

import employeeValidator from "@scripts/validator";

import { default as storageFactory, localStorageEngine } from "@scripts/kv-storage";

const storage = storageFactory({engine: new localStorageEngine()});

export function onRemoveRowBtnClick(e: Event) {
    const num = Utils.getNumberFromElID((<HTMLElement>e.target).id);
    document.getElementById(`row-${num}`).remove();
}

export function onAddRowBtnClick() {
    const 
        table = document.querySelector('tbody'),
        id = table.childElementCount;

    addNewEmployee(table, { id })
}

export function onInput(e: Event) {
    rowsFilter((<HTMLInputElement>e.target).value)
}

export function onSubmitBtnClick(e: Event) {
    e.preventDefault()

    const 
        table = document.querySelector('tbody'),
        employees = new Map();
    let 
        valid = true;

    for (const child of Array.from(table.children)) {
        const 
            empId = Utils.getNumberFromElID((<HTMLElement>e.target).id),
            name = <HTMLInputElement>Utils.getChildrenElement(child, ['class', '[[name]]']),
            position = <HTMLInputElement>Utils.getChildrenElement(child, ['class', '[[position]]']),
            age = (<HTMLInputElement>Utils.getChildrenElement(child, ['class', '[[age]]'])),
            expertise = (<HTMLTextAreaElement>Utils.getChildrenElement(child, ['class', '[[expertise]]'])),
            employee = new Employee ({
                name: name.value,
                position: position?.value,
                age: age?.value,
                expertise: expertise?.value
            }),
            validator = employeeValidator(employee),
            invalidFields = validator.getResults;
            
        valid = validator.isValid

        if (valid) {
            employees.set(empId, employee)
            continue ;
        }
        
        console.log(name,position,age,expertise,)

        name.addEventListener('input', removeIncorrectClass)
        position.addEventListener('input', removeIncorrectClass)
        age.addEventListener('input', removeIncorrectClass)
        expertise.addEventListener('input', removeIncorrectClass)

        if (!invalidFields.name) name.classList.add('incorrect')
        if (!invalidFields.position) position.classList.add('incorrect')
        if (!invalidFields.age) age.classList.add('incorrect')
        if (!invalidFields.expertise) expertise.classList.add('incorrect')

        function removeIncorrectClass(e: Event) {
            (<HTMLElement>e.target).classList.remove('incorrect');
            e.target.removeEventListener('input', removeIncorrectClass);
        }
    }

    if (valid) {
        const res = JSON.stringify(Object.fromEntries(employees.entries()));
        storage.set('employees', res);
    } else {
        console.log('invalid')
    }
}