class PickSymbol {
    constructor () {
        this.symbolX = document.querySelector('.symbol-x');
        this.symbolO = document.querySelector('.symbol-o');
        
        this.symbolX.addEventListener('click', () => this.animateTextShadow(this.symbolO,this.symbolX));
        
        this.symbolO.addEventListener('click', () => this.animateTextShadow(this.symbolX,this.symbolO));

        this.choosenSymbol = null;
    }

    animateTextShadow (remove, add)  {
        remove.classList.remove('animation-text-shadow');
        add.classList.add('animation-text-shadow')

        this.choosenSymbol = add;
    }


}