// var
let buttonsContainer = document.querySelector('.calculator__buttons-container');
let displayNumber = document.getElementById("display-number")
let displayExpression = document.querySelector('.display__number--small');

let activeOperator = "";

let activeNumber = "";
let storedNumber = "";
let memoryNumber = "";
let pointActive = false;

let decimalCounter = 1;


function drawButtons(array){
    for(const object of array){
        let newButton = document.createElement("button");
        newButton.className = object.class;
        // classList.add(button)
        // if(type)
            //
        buttonsContainer.append(newButton);
        newButton.addEventListener('click', object.function);
        buttonsContainer.appendChild(newButton);
        newButton.textContent = object.title;
    }
}

function operate(active, stored, operator){
    console.log('operate');
    if(activeOperator === ""){
        return;
    }
    if(operator === '+'){
        activeNumber = storedNumber + activeNumber;
    }
    else if(operator === '-'){
        activeNumber = storedNumber - activeNumber;
    }
    else if(operator === '*'){
        activeNumber = storedNumber * activeNumber;
    }
    else if(operator === '/'){
        if(active === 0){
            activeNumber = 0;
            updateDisplayNumber("ERROR")
            return;
        }
        activeNumber = storedNumber / activeNumber;
    }
    else if(operator === '√'){
        activeNumber = Math.sqrt(active);
    }
    updateDisplayNumber(activeNumber);
    activeOperator = "";
}

function resetDecimal(){
    pointActive = false;
    decimalCounter = 1;
}

function addOperator(value){
    if(activeOperator != ""){
        operate(activeNumber, storedNumber, activeOperator);
    }
    activeOperator = value;
    resetDecimal();
    if(value === '√'){
        activeNumber = operate(activeNumber, storedNumber, value);
        updateDisplayNumber(activeNumber);
        return;
    }
    saveNumber();
    activeOperator = value;
    // updateDisplayNumber(activeNumber);
}

function addNumber(entry){
    if(activeNumber.toString().length > 15){
        return;
    }
    if(entry === '.'){
        if(pointActive){
            return;
        }
        displayNumber.textContent = activeNumber + '.'
        pointActive = true;
        return;
    }
    if(pointActive){
        activeNumber = activeNumber + entry / (10**decimalCounter);
        updateDisplayNumber(activeNumber);
        decimalCounter++;
        return;
    }
    activeNumber = 10 * activeNumber + entry;
    updateDisplayNumber(activeNumber);
}
function saveNumber(){
    storedNumber = activeNumber
    activeNumber = 0;
}
function clearNumber(){
    if(clearAll){

        return;
    }
}

function updateDisplayNumber(number){ // formatting -> numbers + 15 digits; numbers >= 10^15
    console.log("stored: " + storedNumber + "active: " + activeNumber);
    console.log(activeOperator);
    if(number >= (10 ** 14)){
        let display = number.toExponential(7);
        displayNumber.textContent = display;
        return;
    }
    if(activeNumber % 1 != 0){
        // let decimals = 12 - Math.trunc(activeNumber).toString().length;
        let oi = number.toFixed(1);
        displayNumber.textContent = oi;
        return;
    }
    displayNumber.textContent = number;
}

// function updateDisplayExpression(){
//     if(activeNumber === 0){
//         displayExpression = `${storedNumber} ${activeOperator}`
//         return;
//     }
//     displayExpression = `${storedNumber} ${activeOperator} ${activeNumber}`;
// }

function memoryAddNumber(){}
function memoryRecallNumber(){}
function clearMemory(){}

drawButtons(buttonsArray);

class Button{
    constructor(value, type){
        this.value = value;
        this.type = type;
        this.function = (function(){
            if(this.type === 'number'){
                return addNumber(value);
            }
            if(this.type === 'operator'){
                return addOperator(value);
            }
            if(this.title === '='){
                return operate(activeNumber, storedNumber, activeOperator);
            }
            if(this.type === 'C'){
                return clearNumber(e);
            }
            if(this.title === '+-'){}
            if(this.title === '%'){}
            if(this.title === 'MR'){}
            if(this.title === 'MC'){}
            if(this.title === 'M'){}
            if(this.title === '.'){}
        })
    }
}
