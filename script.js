const displayCurrent = document.getElementById('current');
const displayHistory = document.getElementById('history');
let currentInput = '';
let historyInput = '';
let operator = '';

const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const num = button.getAttribute('data-num');
        const func = button.getAttribute('data-func');
        const oper = button.getAttribute('data-operator');
//koi number ka input ka button ka code
        if (num) {
            currentInput += num;
            displayCurrent.textContent = currentInput;
        }
//normal function button ka 
        if (func) {
            if (func === 'clear') {
                currentInput = '';
                historyInput = '';
                operator = '';
                displayCurrent.textContent = '0';
                displayHistory.textContent = '';
            } else if (func === 'backspace') {
                currentInput = currentInput.slice(0, -1);
                displayCurrent.textContent = currentInput || '0';
            } else if (func === 'calculate') {
                if (currentInput && operator && historyInput) {
                    calculateResult();
                }
            } else if (func === '.') {
                if (!currentInput.includes('.')) {
                    currentInput += '.';
                    displayCurrent.textContent = currentInput;
                }
            }
        }
//operation ka button ka part
        if (oper) {
            if (currentInput) {
                if (historyInput && operator) {
                    calculateResult();
                }
                operator = oper;
                historyInput = currentInput;
                currentInput = '';
                displayHistory.textContent = historyInput + ' ' + getOperatorSymbol(operator);
                displayCurrent.textContent = '';
            }
        }
    });
});

function getOperatorSymbol(oper) {
    switch (oper) {
        case '+': return '+';
        case '-': return '-';
        case '*': return '×';
        case '/': return '÷';
        case 'sqrt': return '√';
        case 'exp': return 'EXP';
        default: return '';
    }
}

function calculateResult() {
    let result;
    const num1 = parseFloat(historyInput);
    const num2 = parseFloat(currentInput);

    switch (operator) {
        case '+': result = num1 + num2; break;
        case '-': result = num1 - num2; break;
        case '*': result = num1 * num2; break;
        case '/': result = num1 / num2; break;
        case 'sqrt': result = Math.sqrt(num1); break;
        case 'exp': result = num1 * Math.pow(10, num2); break;
        default: result = 'Error'; break;
    }

    displayCurrent.textContent = result;
    historyInput = '';
    currentInput = result.toString();
    operator = '';
    displayHistory.textContent = '';
}
