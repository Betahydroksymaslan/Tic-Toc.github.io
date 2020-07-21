class Message {
    constructor (message) {
        this.message = message;
        this.container = document.querySelector('.container');
    }

    buildMessage() {
        const div = document.createElement('div');
        div.classList.add('message');
        div.textContent = this.message;
        this.container.appendChild(div);
    }
}