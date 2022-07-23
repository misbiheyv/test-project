import { Employee } from "@scripts/Employee";

import "@/style.css";

const employees = new Map()

const addBtn = document.getElementById('addRowBtn');

addBtn.addEventListener('click', onAddRowBtnClick);

const submitBtn = document.getElementById('submitBtn');

submitBtn.addEventListener('click', onSubmitBtnClick);

function onAddRowBtnClick() {
    const container = document.querySelector('tbody');
    const el = getNewRow(container.childElementCount + 1)
    container.appendChild(el)
}

function onSubmitBtnClick(e) {
    const container = document.querySelector('tbody');
    for (const child of container.children) {

        const empId = getNumberFromID(e.target.id);
        console.log('childern', child.children)
        employees.set(
            empId,
            new Employee (
                child.children[0].firstElementChild.value,
                child.children[1].firstElementChild.value,
                child.children[2].firstElementChild.value,
                child.children[3].firstElementChild.value
            )
        )
    }
    const res = JSON.stringify(Object.fromEntries(employees.entries()));
    console.log(res)
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
    const tr = document.createElement('tr')
    tr.id = `row-${id}`
    
    const inner = `
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
    `

    tr.innerHTML = inner
    return tr
}