const canvas = document.getElementById('bg__canvas');
const ctx = canvas.getContext('2d');

let body = document.body;
let html = document.documentElement;
let docHeight = Math.max(body.scrollHeight, body.offsetHeight,
  html.clientHeight, html.scrollHeight, html.offsetHeight);

canvas.height = docHeight;
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
            this.symbols[i] = new Symbol(canvas.width, i, this.font, this.height, this.width);
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
let fps = 16;
const nextFrame = 1000/fps;
let timer = 0;

let canvasBgColor = 'rgba(0, 0, 0, 0.05)';
let canvasTextColor = 'rgb(120, 60, 0)';

function animate(timeStamp){
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    if(timer > nextFrame){
        ctx.fillStyle = canvasBgColor;
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
let darkTheme = true;
let themeAnimation = false;
function toggleTheme() {
    if(themeAnimation){
        return;
    }
    themeAnimation = true;
    if(darkTheme){
        darkTheme = false;
        ctx.fillStyle = 'rgba(220, 220, 220, 0.65)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        canvasBgColor = 'rgba(220, 220, 220, 0.05)';
        canvasTextColor = 'rgb(180, 100, 0)';
        const buttons = document.querySelectorAll('.fa-solid')
        for(let i = 0; i < buttons.length; i++){
            buttons[i].className = 'fa-solid fa-sun';
        }
    }else{
        darkTheme = true;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.95)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        canvasBgColor = 'rgba(0, 0, 0, 0.05)';
        canvasTextColor = 'rgb(120, 60, 0)';
        const buttons = document.querySelectorAll('.fa-solid')
        for(let i = 0; i < buttons.length; i++){
            buttons[i].className = 'fa-solid fa-moon';
        }
    }
    setTimeout(()=>{themeAnimation = false;}, 500)
}

function recalculateWindowSize(){
    let body = document.body;
    let html = document.documentElement;
    let docHeight = Math.max(body.scrollHeight, body.offsetHeight,
    html.clientHeight, html.scrollHeight, html.offsetHeight);

    canvas.height = docHeight;
    canvas.width = window.innerWidth;
    effect.resize(canvas.width, canvas.height);
}
function addEventThemeButtons(){
    const buttons = document.querySelectorAll('.fa-solid');
    if(darkTheme){
        for(let i = 0; i < buttons.length; i++){
            buttons[i].className = 'fa-solid fa-moon';
        }
    }else{
        for(let i = 0; i < buttons.length; i++){
            buttons[i].className = 'fa-solid fa-sun';
        }
    }

    let themeButton = document.querySelectorAll('.theme__button');
    console.log(themeButton);
    for(let i = 0; i < themeButton.length; i++){
        themeButton[i].addEventListener('click', toggleTheme);
    }
    let doc
}

//
addEventThemeButtons();
animate(50);
window.addEventListener('resize', recalculateWindowSize);
magicButton.addEventListener('click', addEventThemeButtons);
magicButton.addEventListener('click', recalculateWindowSize);
