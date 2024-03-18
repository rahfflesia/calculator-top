let buttons = document.querySelectorAll('.number');
let clear = document.querySelector('.clear');
let sum = document.querySelector('.sum');
let substraction = document.querySelector('.substraction');
let multiplication = document.querySelector('.multiplication');
let division = document.querySelector('.division');
let equals = document.querySelector('.equals');
let operator;
let firstNumber = '';
let secondNumber = '';
let deleteButton = document.querySelector('.delete');
let decimalPoint = document.querySelector('.point');
let result;

function addToScreen(event) {
    let buttonValue = event.target.textContent;
    let calculatorInput = document.querySelector('.numbers-screen');
    if(calculatorInput.value === "Error" || calculatorInput.value === "Syntax error"){
        clearScreen();
    }
    if(buttonValue === '.' && calculatorInput.value.includes('.')){
        return;
    }
    calculatorInput.value += buttonValue;
}

function clearScreen(){
    document.querySelector('.numbers-screen').value = '';
}

buttons.forEach(button => {
    button.addEventListener('click', addToScreen);
});

decimalPoint.addEventListener('click', addToScreen);

clear.addEventListener('click', function(){
    firstNumber = '';
    secondNumber = '';
    clearScreen();
})

function sumfunc(a, b){
    return parseFloat(a) + parseFloat(b);
}

function subfunc(a, b){
    return a - b;
}

function mulfunc(a, b){
    return a * b;
}

function divfunc(a , b){
    if(b === 0){
        document.querySelector('.numbers-screen').value = "Error";
    }
    else {
        return a / b;
    }
}

sum.addEventListener('click', () => {
    firstNumber = parseFloat(document.querySelector('.numbers-screen').value);
    clearScreen();
    operator = '+';
});

substraction.addEventListener('click', () => {
    firstNumber = parseFloat(document.querySelector('.numbers-screen').value);
    clearScreen();
    operator = '-';
});

multiplication.addEventListener('click', () => {
    firstNumber = parseFloat(document.querySelector('.numbers-screen').value);
    clearScreen();
    operator = '*';
});

division.addEventListener('click', () => {
    firstNumber = parseFloat(document.querySelector('.numbers-screen').value);
    clearScreen();
    operator = '/';
});

function operate(operator){
    secondNumber = parseFloat(document.querySelector('.numbers-screen').value);
        if(isNaN(firstNumber) || isNaN(secondNumber)){
            firstNumber = '';
            secondNumber = '';
            document.querySelector('.numbers-screen').value = "Syntax error";
        }
        else{
            switch(operator){
                case '+':
                    result = sumfunc(firstNumber, secondNumber);
                    document.querySelector('.numbers-screen').value = result.toString();
                    break;
                case '-':
                    result = subfunc(firstNumber, secondNumber);
                    document.querySelector('.numbers-screen').value = result.toString();
                    break;
                case '*':
                    result = mulfunc(firstNumber, secondNumber);
                    document.querySelector('.numbers-screen').value = result.toString();
                    break;
                case '/':
                    result = divfunc(firstNumber, secondNumber).toFixed(6);
                    document.querySelector('.numbers-screen').value = result.toString();
                    break;
                default:
                    console.log('Invalid operand');
            }
        }
}

equals.addEventListener('click', function(){
    operate(operator);
});

function deleteLastCharacter(){
    let array = Array.from(document.querySelector('.numbers-screen').value);
    array.pop();
    document.querySelector('.numbers-screen').value = array.join("");
}

deleteButton.addEventListener('click', deleteLastCharacter);

document.addEventListener('keydown', (event) => {
    const keyPressed = event.key;

    if(keyPressed === "Backspace"){
        deleteLastCharacter();
    }
    else if(keyPressed === "c" || keyPressed === "C"){
        clearScreen();
    }
    else if(keyPressed === "Enter"){
        operate(operator);
    }
    else if('0123456789.'.includes(keyPressed)){
        if(keyPressed === "." && document.querySelector('.numbers-screen').value.includes('.')){
            event.preventDefault();
        }
        else{
            document.querySelector('.numbers-screen').value += keyPressed;
        }
    }
});