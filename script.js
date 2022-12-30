let buttonsContainer = document.querySelector('.calculator__buttons-container');
let displayNumber = document.getElementById("display-number")
let displayExpression = document.querySelector('.display__number--small');
let activeOperator = "";
let currentNumber = 0;
let storedNumber = "";
let memoryNumber = "";
let decimalActive = false;
let decimalCounter = 1;

// DOM elements
function drawButtons(array){
    for(const object of array){
        let newButton = document.createElement("button");
        newButton.className = object.class;
        buttonsContainer.append(newButton);
        newButton.addEventListener('click', object.function);
        buttonsContainer.appendChild(newButton);
        newButton.textContent = object.title;
    }
}

// Operation
// perform operation on the displayed number (%, +-, sqrt)
function operateCurrent(operator){
    if(currentNumber===''){
        currentNumber = storedNumber;
    }

    if(operator === '√'){
        currentNumber = Math.sqrt(currentNumber);
        resetDecimal()
        updateDisplayNumber(currentNumber);
        return;
    }
    else if(operator === '%'){
        currentNumber = currentNumber/100;
        resetDecimal()
        updateDisplayNumber(currentNumber);
        return;
    }
    else if(operator === '+-'){
        currentNumber = -currentNumber;
        updateDisplayNumber(currentNumber);
        return;
    }

}

// perform operation between two operands
function operate(operator){
    updateDisplayExpression();
    if(activeOperator === ""){
        return;
    }
    if(operator === '+'){
        currentNumber = storedNumber + currentNumber;
    }
    else if(operator === '-'){
        currentNumber = storedNumber - currentNumber;
    }
    else if(operator === '*'){
        currentNumber = storedNumber * currentNumber;
    }
    else if(operator === '/'){
        if(currentNumber === 0){
            currentNumber = 0;
            updateDisplayNumber("ERROR")
            return;
        }
        currentNumber = storedNumber / currentNumber;
    }
    resetDecimal()
    updateDisplayNumber(currentNumber);
    activeOperator = "";
    storeNumber();
}

// Input Methods
function addOperator(value){
    resetDecimal();
    if(activeOperator != ""){
        operate(activeOperator);
        activeOperator = value;
        return;
    }
    activeOperator = value;
    if(currentNumber === ''){

    }else{
        storeNumber();
    }
    updateDisplayExpression();
}

function addDecimal(){
    if(decimalActive){
        return;
    }
    if(currentNumber ===  ""){
        currentNumber = 0;
    }
    displayNumber.textContent = currentNumber + '.'
    decimalActive = true;
}

function resetDecimal(){
    decimalActive = false;
    decimalCounter = 1;
}

function addNumber(entry){
    if(currentNumber.toString().length > 11){
        return;
    }
    if(decimalActive){
        console.log(entry / (10 ** decimalCounter));
        currentNumber = parseFloat((currentNumber + entry * (10 ** -decimalCounter)).toFixed(decimalCounter));
        updateDisplayNumber(currentNumber);
        decimalCounter++;
        return;
    }
    currentNumber = 10 * currentNumber + entry;
    updateDisplayNumber(currentNumber);
}

function storeNumber(){
    storedNumber = currentNumber;
    currentNumber = '';
}

function clearNumber(){
    resetDecimal();
    currentNumber = 0;
    storedNumber = "";
    activeOperator = "";
    updateDisplayNumber(currentNumber);
    updateDisplayExpression();
}

// Display
function updateDisplayNumber(number){
    if(number >= (10 ** 14)){
        let display = number.toExponential(7);
        displayNumber.textContent = display;
        return;
    }
    else if(currentNumber % 1 != 0 && currentNumber.toString().length > 10 ){
        console.log('decimal')
        displayNumber.textContent = parseFloat(number.toFixed(10));
        return;
    }
    displayNumber.textContent = number;
}

function updateDisplayExpression(){
    let num = currentNumber;
    if(currentNumber === 0){
        num = ""
    }
    displayExpression.textContent = `${storedNumber} ${activeOperator} ${num}`;
}

// Memory
function memoryAddNumber(){
    memoryNumber = currentNumber;
}
function memoryRecallNumber(){
    if(memoryNumber === '') return;
    currentNumber = memoryNumber;
    updateDisplayNumber(currentNumber);
}
function memoryClear(){
    memoryNumber = '';
}

// init
drawButtons(buttonsArray);
