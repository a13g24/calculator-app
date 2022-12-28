let calcKeys = document.querySelector('.calculator__keys');
let screen = document.querySelector('.calculator__screen');
// let operandList = [];

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
            break;
        case 'other':
        // Handle others ., all-clear, =, delete
            handleOther(selectedKey);
    }
});

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
    // See https://linuxhint.com/add-commas-number-javascript/#:~:text=JavaScript%20provides%20toLocaleString()%2C%20regex,a%20comma%20after%20the%20digit
    const regex = /\B(?=(\d{3})+(?!\d))/g;
    screen.value = screen.value.replace(regex, ',');
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
}

// Handle other keys
function handleOther(other) {
    console.log('Handling other key');

    switch (other.classList[1]) {
        case 'decimal':
            console.log('decimal');
            break;
        case 'all-clear':
            console.log('AC');
            break;
        case 'equal-sign':
            console.log('equals');
            break;
        case 'delete':
            console.log('delete');
    }
}