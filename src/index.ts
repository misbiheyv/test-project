//#region imports

import Employee, { IEmployee, Position as EmployeePositions } from "@scripts/employee";

import employeeValidator from "@scripts/validator";

import { default as storageFactory, localStorageEngine } from "@scripts/kv-storage";

import "@/style.css";

//#endregion

const 
    storage = storageFactory({engine: new localStorageEngine()}),
    addBtn = document.getElementById('addRowBtn'),
    submitBtn = document.getElementById('submitBtn'),
    headerInput = document.getElementById('header-input');

onPageCreated();

//#region eventListeners

window.onbeforeunload = onPageDestroyed;

addBtn.addEventListener('click', onAddRowBtnClick);

submitBtn.addEventListener('click', onSubmitBtnClick);

headerInput.addEventListener('input', onInput);

//#endregion

//#region handlers

function onInput(e: Event) {
    filter((<HTMLInputElement>e.target).value)
}

function onAddRowBtnClick() {
    const 
        table = document.querySelector('tbody'),
        id = table.childElementCount;

    addRowInTable(table, getNewRow(id))
}

function onSubmitBtnClick(e: Event) {
    const 
        table = document.querySelector('tbody'),
        employees = new Map();
    let 
        valid = true;

    for (const child of Array.from(table.children)) {
        const 
            empId = getNumberFromElID((<HTMLElement>e.target).id),
            name = <HTMLInputElement>getChildrenElement(child, ['class', '[[name]]']),
            position = <HTMLInputElement>getChildrenElement(child, ['class', '[[position]]']),
            age = (<HTMLInputElement>getChildrenElement(child, ['class', '[[age]]'])),
            expertise = (<HTMLTextAreaElement>getChildrenElement(child, ['class', '[[expertise]]'])),
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

function onRemoveRowBtnClick(e: Event) {
    const num = getNumberFromElID((<HTMLElement>e.target).id);
    document.getElementById(`row-${num}`).remove();
}

//#endregion

//#region methods

function getNumberFromElID(id: string) {
    const num = /\d+$/.exec(id)
    return num ? num[0] : undefined
}

function getNewRow(
    id: string | number,
    employee: IEmployee = new Employee({name: '', position: '', age: undefined, expertise: ''})
) {
    const { name, position, age, expertise } = employee;

    const selectOptions = `
            <option ${!position || position == EmployeePositions.NONE?'selected':''}>
                ${EmployeePositions.NONE}
            </option>
            <option ${position==EmployeePositions.ANALYTIC?'selected':''}>
                ${EmployeePositions.ANALYTIC}
            </option>
            <option ${position==EmployeePositions.MANAGER?'selected':''}>
                ${EmployeePositions.MANAGER}
            </option>
            <option ${position==EmployeePositions.PROGRAMMER?'selected':''}>
                ${EmployeePositions.PROGRAMMER}
            </option>
            <option ${position==EmployeePositions.LAWYER?'selected':''}>
                ${EmployeePositions.LAWYER}
            </option>
    `

    const html = `
        <tr id="row-${id}">
            <td class="table-body__item">
                <input class="input table__input [[name]]" placeholder="Укажите ФИО" type="text" value="${name ?? ''}">
            </td>
            <td class="table-body__item">
                <select class="table__select [[position]]">${selectOptions}</select>
            </td>
            <td class="table-body__item">
                <input class="input table__input [[age]]" placeholder="Укажите свой возраст" type="number" value="${age ?? ''}">
            </td>
            <td class="table-body__item">
                <textarea class="input table__input [[expertise]]" placeholder="Укажите свои компетенции">${expertise ?? ''}</textarea>
            </td>
            <td class="table-body__item">
                <button class="table-remove__btn" id="rm-btn-${id}">-</button>
            </td>
        </tr>
    `
    return html;
}

function filter(filter : string) {
    const invisibles = Array
        .from(document.querySelector('tbody').children)
        .filter(row => 
                Array.from(row.children)
                .every(el => {
                        return !(<HTMLInputElement | HTMLTextAreaElement>el.children[0]).value.toLowerCase().includes(filter.toLowerCase());
                    }
                )
        );

    for (const el of Array.from(document.querySelector('tbody').children)) {
        if (!invisibles.includes(el)) {
            el.classList.remove('hidden');
            continue ;
        }
        el.classList.add('hidden');
    }
}

async function onPageCreated() {
    const 
        res: any = await storage.get('employees'),
        employees = JSON.parse(res);

    if (employees == undefined || employees.length === 0) return onAddRowBtnClick();

    for (const employee of employees) {
        const 
            table = document.querySelector('tbody'),
            id = table.childElementCount,
            row = getNewRow(
                id,
                new Employee({
                    name: employee.name,
                    position: employee.position,
                    age: employee.age,
                    expertise: employee.expertise
                })
            );

        addRowInTable(table, row)
    }
}

async function onPageDestroyed() {
    const 
        table = document.querySelector('tbody'),
        employees = [];

    for (const child of Array.from(table.children)) {
        employees.push(
            new Employee ({
                name: (<HTMLInputElement | HTMLTextAreaElement>child.children[0].firstElementChild).value,
                position: (<HTMLInputElement | HTMLTextAreaElement>child.children[1].firstElementChild).value,
                age: (<HTMLInputElement | HTMLTextAreaElement>child.children[2].firstElementChild).value,
                expertise: (<HTMLInputElement | HTMLTextAreaElement>child.children[3].firstElementChild).value
            })
        )
    }

    await storage.set('employees', JSON.stringify(employees));
}

function addRowInTable(
    container : HTMLElement, 
    row: string, 
    type: InsertPosition = "beforeend"
): void {
    container.insertAdjacentHTML(type, row)
    container.lastElementChild.querySelector('.table-remove__btn').addEventListener('click', onRemoveRowBtnClick, { once: true })
}

function getChildrenElement(
    parent: Element, 
    option: ['class'|'id', string] | undefined
) : Element | undefined {
    if (option === undefined) return ;

    return (function inner( parent: Element, option: ['class'|'id', string]) : Element | undefined {
        for (const child of parent.children) {
            const [k, v] = option

            if (child.attributes[<any>k]?.value.split(' ').includes(v)) {
                return child;
            }

            return inner(child, option)
        }
        return undefined;
    })(parent, option)

}
//#endregion