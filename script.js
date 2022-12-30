let buttonsContainer = document.querySelector('.calculator__buttons-container');
let displayNumber = document.getElementById("display-number")
let displayExpression = document.querySelector('.display__number--small');
let activeOperator = "";
let activeNumber = 0;
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
    if(activeNumber===''){
        activeNumber = storedNumber;
    }

    if(operator === '√'){
        activeNumber = Math.sqrt(activeNumber);
        resetDecimal()
        updateDisplayNumber(activeNumber);
        return;
    }
    else if(operator === '%'){
        activeNumber = activeNumber/100;
        resetDecimal()
        updateDisplayNumber(activeNumber);
        return;
    }
    else if(operator === '+-'){
        activeNumber = -activeNumber;
        updateDisplayNumber(activeNumber);
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
        activeNumber = storedNumber + activeNumber;
    }
    else if(operator === '-'){
        activeNumber = storedNumber - activeNumber;
    }
    else if(operator === '*'){
        activeNumber = storedNumber * activeNumber;
    }
    else if(operator === '/'){
        if(activeNumber === 0){
            activeNumber = 0;
            updateDisplayNumber("ERROR")
            return;
        }
        activeNumber = storedNumber / activeNumber;
    }
    resetDecimal()
    updateDisplayNumber(activeNumber);
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
    if(activeNumber === ''){

    }else{
        storeNumber();
    }
    updateDisplayExpression();
}

function addDecimal(){
    if(decimalActive){
        return;
    }
    if(activeNumber ===  ""){
        activeNumber = 0;
    }
    displayNumber.textContent = activeNumber + '.'
    decimalActive = true;
}

function resetDecimal(){
    decimalActive = false;
    decimalCounter = 1;
}

function addNumber(entry){
    if(activeNumber.toString().length > 11){
        return;
    }
    if(decimalActive){
        console.log(entry / (10 ** decimalCounter));
        activeNumber = parseFloat((activeNumber + entry * (10 ** -decimalCounter)).toFixed(decimalCounter));
        updateDisplayNumber(activeNumber);
        decimalCounter++;
        return;
    }
    activeNumber = 10 * activeNumber + entry;
    updateDisplayNumber(activeNumber);
}

function storeNumber(){
    storedNumber = activeNumber;
    activeNumber = '';
}

function clearNumber(){
    resetDecimal();
    activeNumber = 0;
    storedNumber = "";
    activeOperator = "";
    updateDisplayNumber(activeNumber);
    updateDisplayExpression();
}

// Display
function updateDisplayNumber(number){
    if(number >= (10 ** 14)){
        let display = number.toExponential(7);
        displayNumber.textContent = display;
        return;
    }
    else if(activeNumber % 1 != 0 && activeNumber.toString().length > 10 ){
        console.log('decimal')
        displayNumber.textContent = parseFloat(number.toFixed(10));
        return;
    }
    displayNumber.textContent = number;
}

function updateDisplayExpression(){
    let num = activeNumber;
    if(activeNumber === 0){
        num = ""
    }
    displayExpression.textContent = `${storedNumber} ${activeOperator} ${num}`;
}

// Memory
function memoryAddNumber(){
    memoryNumber = activeNumber;
}
function memoryRecallNumber(){
    if(memoryNumber === '') return;
    activeNumber = memoryNumber;
    updateDisplayNumber(activeNumber);
}
function memoryClear(){
    memoryNumber = '';
}

// init
drawButtons(buttonsArray);
