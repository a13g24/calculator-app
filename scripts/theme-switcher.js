let toggleSwitch = document.getElementsByClassName('tri-state-toggle__button');
let switches = [...toggleSwitch];

// dynamically change opacity to simulate 3-toggle switch
switches.forEach( (el, index) => {
    el.addEventListener('click', () => {
        el.style.opacity = '1';

        // let currTheme = document.documentElement.getAttribute('data-theme');

        if (index == 0) {
            document.documentElement.setAttribute('data-theme', 'theme-one');
        } else if (index == 1) {
            document.documentElement.setAttribute('data-theme', 'theme-two');
        } else {
            document.documentElement.setAttribute('data-theme', 'theme-three');
        }


        switches
            .filter(function (item) {
                return item != el;
            })
            .forEach((item) => {
                item.style.opacity = '0';
            });
    });
});