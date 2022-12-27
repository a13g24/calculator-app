let toggleSwitch = document.getElementsByClassName('tri-state-toggle__button');
let switches = [...toggleSwitch];

// dynamically change opacity to simulate 3-toggle switch
switches.forEach( (el, index) => {
    el.addEventListener('click', () => {
        el.style.opacity = '1';

        switches
            .filter(function (item) {
                return item != el;
            })
            .forEach((item) => {
                item.style.opacity = '0';
            });
    });
});