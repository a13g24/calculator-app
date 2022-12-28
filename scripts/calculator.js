let calcKeys = document.querySelector('.calculator__keys');
let screen = document.querySelector('.calculator__screen');

// Handle all key click events
calcKeys.addEventListener('click', (e) => {
    let selectedKey = e.target;
    let className = selectedKey.classList[0];

    switch (className) {
        case 'operator':
        // Handle Operators +, -, * /
            console.log('Handling operator key');
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

// Number handler
function handleNumber(numKey) {
    let value = numKey.value;

    // handle special case of only entry being 0

    // concat current screen value
    let newValue = 

    console.log('Handling number key');
}