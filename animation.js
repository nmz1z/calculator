const canvas = document.getElementById('bg__canvas');
const ctx = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var vertical = true;

class Symbol {
    constructor(x, y, font, height, width){
        this.characters = '1234567890';
        this.expressions = [
            "(x + y)"
        ]
        this.x = x;
        this.y = y;
        this.font = font;
        this.text = '';
        this.height = height;
        this.width = width;
    }
    drawHorizontal(context){
        this.text = this.characters.charAt(Math.floor(Math.random()*this.characters.length));
        // context.fillStyle = 'gray'
        context.fillText(this.text, this.x * this.font, this.y * this.font);
        if (this.x * this.font > this.width && Math.random() > 0.98){
            this.x = 0;
        }else{
            this.x += 1;
        }
    }
}

class Effect {
    constructor(width, height, font){
        this.width = width;
        this.height = height;
        this.font = 20;
        this.columns = this.width / this.font;
        this.rows = this.height / this.font;
        this.symbols = [];
        this.#initialize();
    }
    #initialize(){
        // horizontal
        for (let i = 0; i < this.rows; i++) {
            this.symbols[i] = new Symbol(0, i, this.font, this.height, this.width);
        }
    }
    resize(width, height){
        this.width = width;
        this.height = height;
        this.rows = this.height / this.font;
        this.symbols = [];
        this.#initialize();
    }
}

const effect = new Effect(canvas.width, canvas.height);
let lastTime = 0;
let fps = 15;
const nextFrame = 1000/fps;
let timer = 0;

let canvasBgColor = 'rgba(10, 10, 10, 0.05)';
let canvasTextColor = 'rgb(130, 65, 0)';

function animate(timeStamp){
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    if(timer > nextFrame){
        ctx.fillStyle = canvasBgColor;
        // ctx.font = effect.font + 'px monospace';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = canvasTextColor;
        ctx.font = effect.font + 'px monospace';
        effect.symbols.forEach(symbol => symbol.drawHorizontal(ctx));

        timer = 0;
    } else {
        timer += deltaTime;
    }
    requestAnimationFrame(animate);

}
animate(50);

window.addEventListener('resize', () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    effect.resize(canvas.width, canvas.height);
});