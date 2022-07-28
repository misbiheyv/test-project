import Employee, { IEmployee, Position as EmployeePositions } from "@scripts/employee";

import * as handlers from './handlers'

import { default as storageFactory, localStorageEngine } from "@scripts/kv-storage";

const storage = storageFactory({engine: new localStorageEngine()});

export function rowsFilter(filter : string) {
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

export async function onPageCreated() {
    const 
        res: any = await storage.get('employees'),
        employees = JSON.parse(res);

    if (employees == undefined || employees.length === 0) return handlers.onAddRowBtnClick();

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

export async function onPageDestroyed(e: Event) {
    e.preventDefault()

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

export function addNewEmployee(
    parent: HTMLElement, 
    child: string | 
        { 
            id: string | number, 
            employee?: IEmployee 
        },
    insertPosition: InsertPosition = "beforeend"
) : void {
    if (typeof child !== 'string') {
        child.employee = child.employee ?? new Employee({name: '', position: '', age: undefined, expertise: ''})
        addRowInTable(parent, getNewRow(child.id, child.employee), insertPosition)
    } else if (typeof child === 'string') {
        addRowInTable(parent, child, insertPosition)
    }
}

function addRowInTable(
    container : HTMLElement, 
    row: string, 
    type: InsertPosition = "beforeend"
): void {
    container.insertAdjacentHTML(type, row)
    container.lastElementChild.querySelector('.table-remove__btn').addEventListener('click', handlers.onRemoveRowBtnClick, { once: true })
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
