let calcKeys = document.querySelector('.calculator__keys');
let screen = document.querySelector('.calculator__screen');
// TODO: use array to push each number entered (sep by op) on stack

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
            console.log('Handling other key');
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
 * Handles number entries into screen and comma formatting.
 * @param {Object} numKey - The target element
 */
function handleNumber(numKey) {
    let enteredValue = numKey.value;

    // handle special case of only entry being 0
    if (screen.value === '0') {
        screen.value = "";
    }

    // eliminate prev commas 
    screen.value = clearCommas(screen.value)

    // append entered number to existing one
    screen.value += enteredValue;

    // insert new commas
    // See https://linuxhint.com/add-commas-number-javascript/#:~:text=JavaScript%20provides%20toLocaleString()%2C%20regex,a%20comma%20after%20the%20digit
    screen.value = screen.value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}


// Operator handler
function handleOperator(opKey) {
    console.log('Handling operator key');

    switch (opKey.value) {
        case '+':
            console.log('add');
            break;
        case '-':
            console.log('sub');
            break;
        case '*':
            console.log('mult');
            break;
        case '/':
            console.log('div');
    }
}