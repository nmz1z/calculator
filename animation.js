// canvas
const canvas = document.getElementById('bg__canvas');
const ctx = canvas.getContext('2d');

// canvas size
let body = document.body;
let html = document.documentElement;
let docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
canvas.height = docHeight;
canvas.width = window.innerWidth;

// animation
let lastTime = 0;
let fps = 19;
let nextFrame = 53;
let timer = 0;

//
let darkTheme = true;
let themeAnimation = false;
let canvasBgColor = 'rgba(0, 0, 0, 0.05)';
let canvasTextColor = 'rgb(120, 60, 0)';

// classes
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
        this.font = 23;
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

// animation/canvas functions
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
    if(!animation){
        return;
    }
    requestAnimationFrame(animate);

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

let animation = true;

function toogleAnimation(){
    if(animation){
        animation = false;
        const buttons = document.querySelectorAll('.fa-solid.fa-pause')
        for(let i = 0; i < buttons.length; i++){
            buttons[i].className = 'fa-solid fa-play';
        }
    }else{
        animation = true;
        const buttons = document.querySelectorAll('.fa-solid.fa-play')
        for(let i = 0; i < buttons.length; i++){
            buttons[i].className = 'fa-solid fa-pause';
        }
        animate(50);
    }
}

function addAnimationButtons(){
    if(animation){
        const buttons = document.querySelectorAll('.fa-solid.fa-play');
        for(let i = 0; i < buttons.length; i++){
            buttons[i].className = 'fa-solid fa-pause';
        }
    }else{
        const buttons = document.querySelectorAll('.fa-solid.fa-pause');
        for(let i = 0; i < buttons.length; i++){
            buttons[i].className = 'fa-solid fa-play';
        }
    }
    let animationButtons = document.querySelectorAll('.animation__button');
    for(let i = 0; i < animationButtons.length; i++){
        console.log('a');
        animationButtons[i].addEventListener('click', toogleAnimation);
    }
}

// theme functions
function toggleTheme() {

    if(themeAnimation){
        return;
    }
    themeAnimation = true;

    if(darkTheme){
        darkTheme = false;
        document.body.style.backgroundColor = 'white';
        ctx.fillStyle = 'rgba(220, 220, 220, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        canvasBgColor = 'rgba(220, 220, 220, 0.05)';
        canvasTextColor = 'rgb(180, 100, 0)';
        const buttons = document.querySelectorAll('.fa-solid.fa-moon')
        for(let i = 0; i < buttons.length; i++){
            buttons[i].className = 'fa-solid fa-sun';
        }
    }else{
        darkTheme = true;
        document.body.style.backgroundColor = 'black';
        ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        canvasBgColor = 'rgba(0, 0, 0, 0.05)';
        canvasTextColor = 'rgb(120, 60, 0)';
        const buttons = document.querySelectorAll('.fa-solid.fa-sun')
        for(let i = 0; i < buttons.length; i++){
            buttons[i].className = 'fa-solid fa-moon';
        }
    }
    setTimeout(()=>{themeAnimation = false;}, 500)
}

function addEventThemeButtons(){
    if(darkTheme){
        const buttons = document.querySelectorAll('.fa-solid.fa-sun');
        for(let i = 0; i < buttons.length; i++){
            buttons[i].className = 'fa-solid fa-moon';
        }
    }else{
        const buttons = document.querySelectorAll('.fa-solid.fa-moon');
        for(let i = 0; i < buttons.length; i++){
            buttons[i].className = 'fa-solid fa-sun';
        }
    }
    let themeButton = document.querySelectorAll('.theme__button');
    for(let i = 0; i < themeButton.length; i++){
        themeButton[i].addEventListener('click', toggleTheme);
    }
}

//
const effect = new Effect(canvas.width, canvas.height);
addEventThemeButtons();
addAnimationButtons();
animate(50);
window.addEventListener('resize', recalculateWindowSize);
magicButton.addEventListener('click', addEventThemeButtons);
magicButton.addEventListener('click', addAnimationButtons);
magicButton.addEventListener('click', recalculateWindowSize);
