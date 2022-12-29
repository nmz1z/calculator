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

function operate(active, stored, operator){
    if(operator === '√'){
        if(activeNumber===''){
            active = storedNumber;
        }
        activeNumber = Math.sqrt(active);
        resetDecimal()
        updateDisplayNumber(activeNumber);
        return;
    }
    if(operator === '%'){
        if(activeNumber===''){
            active = storedNumber;
        }
        activeNumber = active/100;
        resetDecimal()
        updateDisplayNumber(activeNumber);
        return;
    }
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
        if(active === 0){
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
    if(value === '√' || value === '%'){
        operate(activeNumber, storedNumber, value);
        return;
    }
    if(activeOperator != ""){
        operate(activeNumber, storedNumber, activeOperator);
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

function addNumber(entry){
    if(activeNumber.toString().length > 15){
        return;
    }
    if(entry === '.'){
        if(decimalActive){
            return;
        }
        if(activeNumber ===  ""){
            activeNumber = 0;
        }
        displayNumber.textContent = activeNumber + '.'
        decimalActive = true;
        return;
    }
    if(decimalActive){
        activeNumber = activeNumber + entry / (10**decimalCounter);
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
}

function updateDisplayNumber(number){
    if(number >= (10 ** 14)){
        let display = number.toExponential(7);
        displayNumber.textContent = display;
        return;
    }
    if(activeNumber % 1 != 0 && activeNumber.toString().length > 10 ){
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

let varDisplay = document.getElementById("variables");
window.setInterval(()=> {
    console.log(
    `active: ${activeNumber}, stored: ${storedNumber}, op: ${activeOperator}`)
}, 500);
