//#region imports

import Employee from "@scripts/Employee";

import EmployeeValidator from "./scripts/EmployeeValidator";

import "@/style.css";

//#endregion

const employees = new Map()

const employeeValidator = new EmployeeValidator()

const addBtn = document.getElementById('addRowBtn');

addBtn.addEventListener('click', onAddRowBtnClick);

const submitBtn = document.getElementById('submitBtn');

submitBtn.addEventListener('click', onSubmitBtnClick);

const headerInput = document.getElementById('header-input')

headerInput.addEventListener('input', onInput)

onAddRowBtnClick()

//#region methods

function onInput(e) {
    filter(e.target.value, document.querySelector('tbody').children)
}

function onAddRowBtnClick() {
    const container = document.querySelector('tbody');
    let id = 0;
    if (container.children.length > 0) {
        id = container.childElementCount + 1
    }
    const el = getNewRow(id)
    container.insertAdjacentHTML("beforeEnd", el)
}

function onSubmitBtnClick(e) {
    const container = document.querySelector('tbody');
    for (const child of container.children) {
        const empId = getNumberFromID(e.target.id);
        const employee = new Employee (
            child.children[0].firstElementChild.value,
            child.children[1].firstElementChild.value,
            child.children[2].firstElementChild.value,
            child.children[3].firstElementChild.value
        )
        const invalidFields = employeeValidator.validCheck(employee).getInvalids()
        if (invalidFields === undefined) {
            employees.set(
                empId,
                employee
            )
        } else {
            return console.log('valid', invalidFields);
        }
    }
    const res = JSON.stringify(Object.fromEntries(employees.entries()));
}

function onRemoveRowBtnClick(e) {
    const num = getNumberFromID(e.target.id)
    document.getElementById(`row-${num}`).remove()
}

function getNumberFromID(id) {
    const num = /\d+$/.exec(id)
    return num ? num[0] : undefined
}

function getNewRow(id) {
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

function filter(filter) {
    const invisibles = Array
        .from(document.querySelector('tbody').children)
        .filter(row => 
                Array.from(row.children)
                .every(el => {
                        return !el.children[0].value.toLowerCase().includes(filter.toLowerCase());
                    }
                )
        );

    for (const el of document.querySelector('tbody').children) {
        if (!invisibles.includes(el)) {
            el.classList.remove('hidden');
        } else {
            el.classList.add('hidden');
        }
    }
}

//#endregion