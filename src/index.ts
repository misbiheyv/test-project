//#region imports

import Employee from "@scripts/Employee";

import EmployeeValidator from "./scripts/EmployeeValidator";

import Storage from "./scripts/Storage";

import "@/style.css";

//#endregion

const 
    storage = new Storage(),
    employeeValidator = new EmployeeValidator(),
    addBtn = document.getElementById('addRowBtn'),
    submitBtn = document.getElementById('submitBtn'),
    headerInput = document.getElementById('header-input');


addBtn.addEventListener('click', onAddRowBtnClick);

submitBtn.addEventListener('click', onSubmitBtnClick);

headerInput.addEventListener('input', onInput)

onAddRowBtnClick()

//#region methods

function onInput(e: Event) {
    filter((<HTMLInputElement>e.target).value)
}

function onAddRowBtnClick() {
    const container = document.querySelector('tbody');
    let id = 0;
    if (container.children.length > 0) {
        id = container.childElementCount + 1
    }
    const el = getNewRow(id)
    container.insertAdjacentHTML("beforeend", el)
}

function onSubmitBtnClick(e: Event) {
    const 
        container : HTMLTableSectionElement = document.querySelector('tbody'),
        employees = new Map();
    let 
        valid = true;

    for (const child of Array.from(container.children)) {
        const 
            empId = getNumberFromID((<HTMLElement>e.target).id),
            inp1: HTMLInputElement = <HTMLInputElement>child.children[0].firstElementChild,
            inp2: HTMLInputElement = <HTMLInputElement>child.children[1].firstElementChild,
            inp3: HTMLInputElement = <HTMLInputElement>child.children[2].firstElementChild,
            inp4: HTMLTextAreaElement = <HTMLTextAreaElement>child.children[3].firstElementChild;

        const employee = new Employee (
            inp1.value,
            inp2.value,
            inp3.value,
            inp4.value
        )
        const invalidFields = employeeValidator.validCheck(employee).getInvalids()

        if (invalidFields === undefined) {
            employees.set(
                empId,
                employee
            )
            continue ;
        }

        valid = false

        inp1.addEventListener('input', removeIncorrectClass)
        inp2.addEventListener('input', removeIncorrectClass)
        inp3.addEventListener('input', removeIncorrectClass)
        inp4.addEventListener('input', removeIncorrectClass)

        if (invalidFields.includes('name')) inp1.classList.add('incorrect')
        if (invalidFields.includes('position')) inp2.classList.add('incorrect')
        if (invalidFields.includes('age')) inp3.classList.add('incorrect')
        if (invalidFields.includes('expertise')) inp4.classList.add('incorrect')

        function removeIncorrectClass(e: Event) {
            (<HTMLElement>e.target).classList.remove('incorrect');
            e.target.removeEventListener('input', removeIncorrectClass);
        }
    }
    if (valid) {
        const res = JSON.stringify(Object.fromEntries(employees.entries()));
        storage.setValue('employees', res);
    } else {
        console.log('invalid')
    }
}

function onRemoveRowBtnClick(e: Event) {
    const num = getNumberFromID((<HTMLElement>e.target).id)
    document.getElementById(`row-${num}`).remove()
}

function getNumberFromID(id: string) {
    const num = /\d+$/.exec(id)
    return num ? num[0] : undefined
}

function getNewRow(id: string | number) {
    const html =  `
        <tr id="row-${id}">
            <td class="table-body__item">
                <input class="input table__input" placeholder="Укажите ФИО" type="text">
            </td>
            <td class="table-body__item">
                <select class="table__select">
                    <option>не выбрано</option>
                    <option>аналитик</option>
                    <option>менеджер</option>
                    <option>программист</option>
                    <option>юрист</option>
                </select>
            </td>
            <td class="table-body__item">
                <input class="input table__input" placeholder="Укажите свой возраст" type="number">
            </td>
            <td class="table-body__item">
                <textarea class="input table__input" placeholder="Укажите свои компетенции"></textarea>
            </td>
            <td class="table-body__item">
                <button class="table-remove__btn" id="rm-btn-${id}" onclick="onRemoveRowBtnClick(event)">-</button>
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
        } else {
            el.classList.add('hidden');
        }
    }
}

function onPageUnload() {
    const container = document.querySelector('tbody');
    const employees = []

    for (const child of Array.from(container.children)) {
        employees.push(
            new Employee (
                (<HTMLInputElement | HTMLTextAreaElement>child.children[0].firstElementChild).value,
                (<HTMLInputElement | HTMLTextAreaElement>child.children[1].firstElementChild).value,
                (<HTMLInputElement | HTMLTextAreaElement>child.children[2].firstElementChild).value,
                (<HTMLInputElement | HTMLTextAreaElement>child.children[3].firstElementChild).value
            )
        )
    }

    storage.setValue('employees', JSON.stringify(employees));
}

//#endregion