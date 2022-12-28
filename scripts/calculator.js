// global var to keep track of per term decimals
let decimalCounter = 0;
let calcKeys = document.querySelector('.calculator__keys');
let screen = document.querySelector('.calculator__screen');

let letterLength = {};  // stores approx letter lengths
let screenTxtLength = 0; // approx length of string in screen

// calculate letter lengths when DOM loaded
addEventListener('DOMContentLoaded', (e) => {
    let letters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', ',', '+', '-', '*', '/'];

    // calculate width of each letter
    for (let letter of letters) {
        let span = document.createElement('span');
        span.append(document.createTextNode(letter));
        span.style.display = "inline-block";
        document.body.append(span);
        letterLength[letter] = span.offsetWidth /*+ "px"*/;
        span.remove();
    }
});

// Handle all key click events
calcKeys.addEventListener('click', (e) => {
    let selectedKey = e.target;
    let className = selectedKey.classList[0];

    switch (className) {
        case 'operator':
        // Handle Operators +, -, * /
            handleOperator(selectedKey);
            break;
        case 'number':
        // Handle Numbers 0 thru 9
            handleNumber(selectedKey);
            // adjust screen size according to current length
            adjustStringSize(screen.value);
            break;
        case 'other':
        // Handle others ., all-clear, =, delete
            handleOther(selectedKey);
    }

});


/**
 * Function to check if string text in screen needs size adjustment
 * @param {string} s - The screen string to adjust
 */
function adjustStringSize(s) {
    // get computed values of screen
    const THRESHOLD = 0.80;
    let computed = window.getComputedStyle(screen);
    let cWidth = Number(computed.getPropertyValue('width').replace('px', ''));

    let calculatedLength = 0;

    // calculate approx width of screen text
    for (let i = 0; i < s.length; i++) {
        calculatedLength += letterLength[s[i]];
        // console.log(s[i] + ": " + letterLength[s[i]])
    }
    
    let ratio = (calculatedLength / cWidth);

    console.log(`cWidth = ${cWidth}\nTxt Width = ${calculatedLength}\nratio= ${ratio}`);

    if (ratio > THRESHOLD) {
        console.log('Hit');
        let newFontSize = Number(getComputedStyle(screen).getPropertyValue('font-size').replace('px', '')) * 0.9;
        // newFontSize -= 1;
        screen.style.fontSize = `${newFontSize}px`;
    }
}

/**
 * Replaces commas in string with empty strings.
 * @param {string} s - String representing a number (comma separated)
 * @returns Comma eliminated string
 */
function clearCommas(s) {
    return screen.value.replace(/,/g, '');
}

/**
 * Helper function to determine if a char is an operator.
 * @param {string} op - The operator to test
 * @returns 
 */
function isAnOperator(op) {
    return '+-/*'.includes(op);
}

/**
 * Handles number entries into screen and comma formatting.
 * @param {Object} numKey - The target element
 */
function handleNumber(numKey) {
    let enteredValue = numKey.value;
    let lastChar = screen.value[screen.value.length - 1];

    // handle special case of only entry being 0
    if (screen.value === '0') {
        screen.value = "";
    } else if (isAnOperator(lastChar) && enteredValue === '0') {
    // handle case when 0 is input after operator
        return;
    }

    // eliminate prev commas 
    screen.value = clearCommas(screen.value)

    // append entered number to existing one
    screen.value += enteredValue;

    // insert new commas
    const regexOne = /(^|[^0-9.])([0-9]{4,})/g; // selects part before decimal
    const regexTwo = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g; // selects every 3rd num

    // ensures only part before decimal is comma delimited
    screen.value = screen.value.replace(regexOne, ($0, $1, $2) => {
        return $1 + $2.replace(regexTwo, '$&,');
    })
}

/**
 * Handles keys that are operators
 * @param {Object} opKey - A key object whose value is an operator
 */
function handleOperator(opKey) {
    let lastChar = screen.value[screen.value.length - 1];

    // handle special case when operator entered twice
    if (isAnOperator(lastChar)) {
        let lastDex = screen.value.length - 1;

        // get last value in screen and change it to entered value
        screen.value = screen.value.substring(0, lastDex) + opKey.value;
    } else {
        screen.value += opKey.value;
    }
    
    if (decimalCounter === 1)
        decimalCounter--;
}

// Handle other keys
function handleOther(otherKey) {
    switch (otherKey.classList[1]) {
        case 'decimal':
            console.log('decimal');
            insertDecimal(otherKey);
            break;
        case 'all-clear':
            screen.value = '0';
            decimalCounter = 0;
            screen.style.fontSize = '';
            break;
        case 'equal-sign':
            console.log('equals');
            decimalCounter = 0;
            break;
        case 'delete':
            console.log('delete');
    }
}

/**
 * Inserts a decimal into a term.
 * @param {Object} key - The key object (decimal) to insert
 */
function insertDecimal(key) {
    // only insert if decimal not already in string
    if (decimalCounter === 0) {
        let lastDex = screen.value.length - 1;
        if (isAnOperator(screen.value[lastDex])) {
            screen.value += '0';       
        }

        screen.value += key.value;

        // keep track of if decimal was entered in this term
        decimalCounter++;
    } 
}