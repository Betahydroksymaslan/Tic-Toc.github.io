class Game {
    constructor() {
        this.fields = document.querySelectorAll('.fields');
        
        this.fields.forEach(field => {
            field.addEventListener('click', this.handleClick.bind(this))
        })
        
        this.container = document.querySelector('.container');

        this.cross = `x`;
        this.circle = `o`;

        this.symbolX = document.querySelector('.symbol-x');
        this.symbolO = document.querySelector('.symbol-o');
        
        this.symbolX.addEventListener('click', () => this.animateTextShadow(this.symbolO,this.symbolX));
        
        this.symbolO.addEventListener('click', () => this.animateTextShadow(this.symbolX,this.symbolO));

        this.isSymbolChoossen = false;

        this.exitMessage = document.addEventListener('click', e => this.messageOff(e));
    }
      
    animateTextShadow (remove, add)  {
        remove.classList.remove('animation-text-shadow');
        add.classList.add('animation-text-shadow');
        this.isSymbolChoossen = true;
        this.initGame();
    }

    message(message) {
        const messageWrapper = document.createElement('div');
        messageWrapper.classList.add('messageWrapper');
        this.container.appendChild(messageWrapper);
        
        const div = document.createElement('div');
        div.classList.add('message');
        div.textContent = message;
        document.body.appendChild(div);

        const exit = document.createElement('div');
        exit.textContent = '+';
        exit.classList.add('messageExit' , 'animation-text-shadow');
        div.appendChild(exit);

        this.container.classList.add('blur');
    }

    messageOff(e) {
        if (e.target.classList.contains('messageExit')) {
            e.target.parentNode.remove();
            this.container.classList.remove('blur');
        } else return;
    }

    handleClick(e) {
        const index = e.target.id;

        if (!this.moves[index] && this.currentPlayer) {
            this.moves[index] = this.currentPlayer;
            this.renderBoard();

            if (this.checkWin()) {
                this.winner = this.currentPlayer;
                this.message(`Koniec gry!
                Wygrał: ${this.winner}`);
                this.initGame();
            } else if (this.isBoardFull()) {
                this.message('REMIS!')
                this.initGame();
            }
            
            this.changePlayer();
        } else return;
    }
    
    initGame() {
        this.currentPlayer = this.startPlayer();
        this.moves = new Array(9).fill('');
        this.winner = null;
        
        this.renderBoard();
    }



    startPlayer() {
        if (this.isSymbolChoossen) { 
            return this.symbolX.classList.contains('animation-text-shadow') ?  this.cross : this.circle;
        }
    }
    

    renderBoard() {
        this.fields.forEach((field, index) => {
            field.innerHTML = this.moves[index];
        })
    }

    isBoardFull() {
       return this.moves.indexOf('') === -1;
    }
    
    changePlayer() {
        this.currentPlayer = this.currentPlayer === this.circle ? this.cross : this.circle;
    }

    checkWin() {
        const moves = this.moves;

        for (let i = 0; i < 3; i++) {
            if (this.winCombinations(moves[i * 3], moves[i*3+1], moves[i*3+2])) {
                return true;
            } else if (this.winCombinations(moves[i], moves[i + 3], moves[i + 6])) {
                return true;
            } 
        }

        if (this.winCombinations(moves[0], moves[4], moves[8])) {
            return true;
        }
        if (this.winCombinations(moves[2], moves[4], moves[6])) {
            return true;
        }
    }

    winCombinations(a,b,c) {
       return !!a && a === b && b === c && a === c
    }
}








