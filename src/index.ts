import "@/style.scss";

import { 

    tableMethods, 
    tableHandlers 

} from './scripts/components/table';

import Modal from "@scripts/components/modal";

const 
    modal = new Modal(['id', 'modal']),
    addBtn = document.getElementById('addRowBtn'),
    submitBtn = document.getElementById('submitBtn'),
    headerInput = document.getElementById('header-input');

tableMethods.onPageCreated();

window.onbeforeunload = tableMethods.onPageDestroyed;

addBtn.addEventListener('click', tableHandlers.onAddRowBtnClick);

submitBtn.addEventListener('click', tableHandlers.onSubmitBtnClick);

headerInput.addEventListener('input', tableHandlers.onInput);

document.querySelectorAll('.show-modal__link').forEach(element => {
    element.addEventListener('click', modal.showModal.bind(modal))
});