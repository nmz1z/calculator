const calcContainer = document.querySelector('.calculator-container');

class Calculator {
    constructor() {
        this.body = document.createElement('div');
        this.display = new Display(this.body);
        this.computer = new Computer(this.display);
    }

    setUp(template) {

        calcContainer.appendChild(this.body);
        this.body.classList.add('calculator');

        this.drawHeader();
        this.drawScreen();
        this.drawKeyboard(template);
        this.drawFooter();
    }

    drawHeader(){
        const header = document.createElement('div');
        header.classList.add('calculator__header');
        this.body.appendChild(header);
        // add logo
        const logo = document.createElement('img');
        logo.src = 'img/logo.png'
        logo.classList.add('logo');
        header.appendChild(logo);
        // add theme button
        const themeButton = document.createElement('div');
        themeButton.classList.add('theme__button');
        header.appendChild(themeButton);
        // add them icon
        const themeIcon = document.createElement('i');
        themeIcon.classList.add('fa-solid');
        themeIcon.classList.add('fa-moon');
        themeButton.appendChild(themeIcon);
         // add animation button container
         const animationButton = document.createElement('div');
         animationButton.classList.add('animation__button');
         header.appendChild(animationButton);
         // add them icon
         const animationIcon = document.createElement('i');
         animationIcon.classList.add('fa-solid');
         animationIcon.classList.add('fa-pause');
         animationButton.appendChild(animationIcon);
        // add socials container
        const socialDiv = document.createElement('i');
        socialDiv.classList.add('social-icons');
        header.appendChild(socialDiv);
        // add github anchor > icon
        const aGithub = document.createElement('a');
        aGithub.href = 'https://github.com/nmz1z';
        socialDiv.appendChild(aGithub);
        const githubIcon = document.createElement('i');
        githubIcon.classList.add('fa-brands');
        githubIcon.classList.add('fa-github');
        aGithub.appendChild(githubIcon);
        // add twitter anchor > icon
        const aTwitter = document.createElement('a');
        aTwitter.href = 'https://twitter.com/nmz1z_';
        socialDiv.appendChild(aTwitter);
        const twitterIcon = document.createElement('i');
        twitterIcon.classList.add('fa-brands');
        twitterIcon.classList.add('fa-twitter');
        aTwitter.appendChild(twitterIcon);
        }

    drawKeyboard(template) {
        const keyboard = document.createElement('div');
        keyboard.classList.add('calculator__buttons-container'); // grid container for keys
        this.body.appendChild(keyboard);
        for(const item of template){
            const key = new Key(item.value, item.type, this.computer);
            key.getClickHandler();
            const style = key.getClass(item.value, item.type);
            key.body.className = style;
            key.body.textContent = item.value;
            key.body.addEventListener('click', key.handleClick);
            keyboard.appendChild(key.body);
        }
    }
    drawScreen() {
        const screen = document.createElement('div');
        screen.classList.add('calculator__display');
        this.body.appendChild(screen);
        //
        this.display.memory.classList.add('display__memory');
        this.display.memory.textContent = 'M';
        screen.appendChild(this.display.memory);
        //
        this.display.expression.classList.add('display__number--small');
        screen.appendChild(this.display.expression);
        //
        this.display.number.classList.add('display__number--big');
        this.display.number.textContent = '0';
        screen.appendChild(this.display.number);

    }
    drawFooter(){
        // footer div
        const footer = document.createElement('div');
        footer.classList.add('calculator__footer');
        this.body.appendChild(footer);
        // footer anchor
        const name = document.createElement('p');
        name.href = 'https://twitter.com/nmz1z_';
        footer.appendChild(name);
        // footer text
        const website = document.createElement('a');
        website.textContent = 'nmz1z';
        website.href = 'https://nmz1z.github.io/landing-page/'
        name.appendChild(website);
        //
        const year = document.createElement('p');
        year.textContent = '2022';
        footer.appendChild(year);
    }
}

class Computer {
    constructor(display) {
        this.stored = '';       // stored operand
        this.active = 0;        // active operand
        this.operator = '';     // active operator
        this.memory = '';
        this.decimal = false;
        this.decimalCounter = 1;
        this.display = display;
    }

    // processor
    addNumber(value){
        if(this.active.toString().length > 11){
            return;
        }
        if(this.decimal){
            this.active = parseFloat((this.active + value * (10 ** -this.decimal)).toFixed(this.decimal));
            this.display.updateNumber(this.active);
            this.decimal++;
            return;
        }

        this.active = 10 * this.active + value;
        this.display.updateNumber(this.active);
    }

    addDecimal(){
        if(this.active.toString().length > 9) return;
        if(this.decimal) return;

        if(this.active ===  ''){
            this.active = 0;
        }
        this.display.number.textContent = this.active + '.'
        this.decimal = true;
    }

    resetDecimal(){
        this.decimal = false;
        this.decimalCounter = 1;
    }

    addOperator(value){
        this.resetDecimal();

        if(this.operator != ''){
            this.operateBoth();
            this.operator = value;
            return;
        }

        this.operator = value;

        if(this.active !== ''){
            this.storeNumber();
        }
        this.display.updateExpression(this.active, this.stored, this.operator);

    }

    operateBoth(){
        this.display.updateExpression(this.active, this.stored, this.operator);

        if(this.operator === ''){
            return;
        }else if(this.operator === '+'){
            this.active = this.stored + this.active;
        }else if(this.operator === '-'){
            this.active = this.stored - this.active;
        }else if(this.operator === '*'){
            this.active = this.stored * this.active;
        }else if(this.operator === '/'){
            if(this.active === 0){
                this.display.updateNumber("ERROR");
                return;
            }
            this.active = this.stored / this.active;
        }

        this.resetDecimal();
        this.display.updateNumber(this.active);
        this.operator = ""
        this.storeNumber();

    }

    operateSingle(value){
        if(this.active === ''){
            this.active = this.stored;
        }

        if(value === 'sqrt'){
            this.active = Math.sqrt(this.active);
        }else if(value === '%'){
            this.active = (this.active)/100;
        }else if(value === '+-'){
            this.active = -1 * (this.active);
        }
        this.display.updateNumber(this.active);

    }

    // memory functions
    storeNumber(){
        this.stored = this.active;
        this.active = '';
    }

    clearNumbers(){
        this.resetDecimal();
        this.active = 0;
        this.stored = '';
        this.operator = '';
        this.display.updateNumber(this.active);
        this.display.updateExpression(this.active, this.stored, this.operator);
    }

    saveIntoMemory() {
        if(this.memory === ''){
            this.display.toggleMemory();
        }
        this.memory = this.active;
    }

    getFromMemory() {
        if(this.memory === '') return;
        this.active = this.memory;
        this.display.updateNumber(this.active);
    }

    clearMemory() {
        if(this.memory !== ''){
            this.memory = '';
            this.display.toggleMemory();
        }
    }

    // for debugging purposes only
    showValues(){
        setInterval(() => {
            console.log(`active: ${this.active}; stored: ${this.stored}, operator ${this.operator}`)
        }, 500)
    }
}

class Display {
    constructor() {
        this.number = document.createElement('p');
        this.expression = document.createElement('p');
        this.memory = document.createElement('p');
    }
    updateNumber(number) {
        if(number >= (10 ** 14)){
            let display = number.toExponential(7);
            this.number.textContent = display;
            return;
        }
        else if(number % 1 !== 0 && number.toString().length > 10 ){
            let integerLength = Math.trunc(number).toString().length;
            this.number.textContent = parseFloat(number.toFixed(10 - integerLength));
            return;
        }
        this.number.textContent = number;
    }
    updateExpression(active, stored, operator) {
        let num = active;
        if(active === 0){
        num = ""
    }
        this.expression.textContent = `${stored} ${operator} ${num}`;
    }

    toggleMemory(){
        this.memory.classList.toggle('memory-active');
    }
}

class Key {
    constructor(value, type, computer) {
        this.body = document.createElement('button');
        this.value = value;
        this.type = type;
        this.computer = computer;
        this.handleClick;
    }

    getClickHandler() {
        const computer = this.computer;
        if (this.type === 'number') {
            this.handleClick = () => computer.addNumber(this.value);
        } else if (this.type === 'operator') {
            this.handleClick = () => computer.addOperator(this.value);
        } else if (this.type === 'operator-single') {
            this.handleClick = () => computer.operateSingle(this.value);
        } else if (this.type === 'decimal') {
            this.handleClick = () => computer.addDecimal();
        } else if (this.type === 'equal') {
            this.handleClick = () => computer.operateBoth();
        } else if (this.type === 'clear') {
            this.handleClick = () => computer.clearNumbers();
        } else if (this.type === 'memory-save') {
            this.handleClick = () => computer.saveIntoMemory();
        } else if (this.type === 'memory-clear') {
            this.handleClick = () => computer.clearMemory();
        } else if (this.type === 'memory-remember') {
            this.handleClick = () => computer.getFromMemory();
        }
    }

    getClass(value, type) {
        if (value === 0) {
            return 'button number doubled';
        }
        if (type === 'number' || type === 'decimal') {
            return 'button number';
        } else if (type === 'operator' || type === 'equal') {
            return 'button operator';
        } else {
            return 'button special';
        }
    }
}

function getRandomText(array){
    let index = Math.floor(Math.random() * array.length);
    const calcCounter = document.querySelectorAll('.calculator').length;
    if(calcCounter === 0){
        magicButton.textContent = 'Create another Calculator';
        return;
    }else if(calcCounter === 1){
        magicButton.textContent = 'Ok, maybe one more?';
        return;
    }else if(calcCounter === 2){
        magicButton.textContent = 'That\'s enough...';
        return;
    }
    if(magicButton.textContent === array[index]){
        getRandomText(textArray);
    }else{
        magicButton.textContent = array[index];
    }
}

function createCalculator(){
    getRandomText(textArray);
    const calculator = new Calculator;
    calculator.setUp(keysTemplate);

}

// init
const magicButton = document.getElementById('magic-button');
magicButton.addEventListener('click', createCalculator);
