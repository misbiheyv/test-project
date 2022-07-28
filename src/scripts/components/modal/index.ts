export default class Modal {
    private params: ['id' | 'className', string];
    
    public get getCurrentModal() {
        if (this.params[0] === 'id') {
            return document.querySelector(`#${this.params[1]}`)
        } else {
            return document.querySelector(`.${this.params[1]}`)
        }
    }

    constructor(params: ['id' | 'className', string]) {
        this.params = params;
        this.initModal();
    }

    private initModal() {
        this.getCurrentModal.addEventListener('click', this.closeModal.bind(this))

        this.getCurrentModal.querySelector('.close-btn').addEventListener('click', 
            this.closeModal.bind(this)
        )

        this.getCurrentModal.children[0].addEventListener('click', (event) => {
            event.stopPropagation()
        })
    }

    showModal(): void {
        this.getCurrentModal.classList.remove('hidden')
        this.freezePage()
    }

    closeModal(): void {
        this.getCurrentModal.classList.add('hidden')
        this.unfreezePage()
    }

    private freezePage(): void {
        document.body.style.overflow = 'hidden'
    }

    private unfreezePage(): void {
        document.body.style.overflow = 'scroll'
    }

}