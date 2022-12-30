let buttonsContainer = document.querySelector('.calculator__buttons-container');
let displayNumber = document.getElementById("display-number")
let displayExpression = document.querySelector('.display__number--small');
let activeOperator = "";
let activeNumber = 0;
let storedNumber = "";
let memoryNumber = "";
let decimalActive = false;
let decimalCounter = 1;

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
        activeNumber = activeNumber/100;
        updateDisplayNumber(activeNumber);
        return;
    }

}

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
    saveNumber();
}

function resetDecimal(){
    decimalActive = false;
    decimalCounter = 1;
}

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
        saveNumber();
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

function saveNumber(){
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

// ignore this; debugging purposes
let varDisplay = document.getElementById("variables");
window.setInterval(()=> {
    console.log(
    `active: ${activeNumber}, stored: ${storedNumber}, op: ${activeOperator}`)
}, 500);
