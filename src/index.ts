import "@/style.css";

import { 

    tableMethods, 
    tableHandlers 

} from './scripts/components/table';

const 
    addBtn = document.getElementById('addRowBtn'),
    submitBtn = document.getElementById('submitBtn'),
    headerInput = document.getElementById('header-input');

tableMethods.onPageCreated();

window.onbeforeunload = tableMethods.onPageDestroyed;

addBtn.addEventListener('click', tableHandlers.onAddRowBtnClick);

submitBtn.addEventListener('click', tableHandlers.onSubmitBtnClick);

headerInput.addEventListener('input', tableHandlers.onInput);