// Functions to add, subtract, multiply, and divide two numbers
const add = (a, b)=> a + b;
const subtract = (a, b)=> a - b;
const multiply = (a, b)=> a * b;
const divide = (a, b)=> a / b;

const operate = (stringInput)=>{
    const tokens = stringInput.split(/([+\-*/])/).map(token => token.trim()).filter(token => token.length > 0);
    const numberStack = [];
    const operatorStack = [];
  
    const precedence = {
      '+': 1,
      '-': 1,
      '*': 2,
      '/': 2
    };
  
    tokens.forEach(token => {
      if ('+-*/'.includes(token)) {
        while (operatorStack.length > 0 && precedence[token] <= precedence[operatorStack[operatorStack.length - 1]]) {
          const operator = operatorStack.pop();
          const b = numberStack.pop();
          const a = numberStack.pop();
          switch (operator) {
            case '+':
              numberStack.push(add(a, b));
              break;
            case '-':
              numberStack.push(subtract(a, b));
              break;
            case '*':
              numberStack.push(multiply(a, b));
              break;
            case '/':
              numberStack.push(divide(a, b));
              break;
          }
        }
        operatorStack.push(token);
      } else {
        numberStack.push(parseFloat(token));
      }
    });
  
    while (operatorStack.length > 0) {
      const operator = operatorStack.pop();
      const b = numberStack.pop();
      const a = numberStack.pop();
      switch (operator) {
        case '+':
          numberStack.push(add(a, b));
          break;
        case '-':
          numberStack.push(subtract(a, b));
          break;
        case '*':
          numberStack.push(multiply(a, b));
          break;
        case '/':
          numberStack.push(divide(a, b));
          break;
      }
    }
  
    return numberStack.pop();
  }


const inputBtn = document.querySelectorAll('.input-val');
const result = document.querySelector('#result');
const clear = document.querySelector('#clear');
const backspace = document.querySelector('#backspace');
const equals = document.querySelector('#equals');


let inputVal = '';
result.value = 0;
const inputDisplay = document.querySelector('#input');

for(let input of inputBtn){
    input.addEventListener('click', ()=>{
        inputVal += input.value;
        if(['+', '-', '*', '/'].includes(inputVal[0])){
            if(result.value !== 0){
                inputVal = result.value + inputVal;
                result.innerHTML = '';
            }else{
                inputVal = '0' + inputVal;
            }
            
        }
        inputDisplay.innerHTML = inputVal;
    })
}
equals.addEventListener('click', ()=>{
    let res = 0
    if(inputVal !== '' && inputVal.length > 2){
        res = operate(inputVal);
    }
    else{
        switch (inputVal[1]) {
            case "+":
              res = inputVal[0] + inputVal[0];
              break;
            case "-":
              res = inputVal[0] - inputVal[0];
              break;
            case "*":
              res = inputVal[0] * inputVal[0];
              break;
            case "/":
              res = inputVal[0] / inputVal[0];
              break;
          }
    }
    result.innerHTML = res;
    result.value = res;
    inputVal = '';
})
clear.addEventListener('click', ()=>{
    inputVal = '';
    inputDisplay.innerHTML = inputVal;
    result.innerHTML = '';
})
backspace.addEventListener('click', ()=>{
    if(result.value !== 0){
        inputVal = ''
        result.innerHTML = '';
    }
    else{
        inputVal = inputVal.slice(0, -1);
    }
    inputDisplay.innerHTML = inputVal;
})
