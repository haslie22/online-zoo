const body = document.querySelector('body');

//helpers
function toggleClass(item, className) {
    item.classList.toggle(className);
}

function getRandomNum(low, high) {
    return Math.floor(Math.random() * (high - low + 1)) + low;
}

function getRandomArray(length, low, high) {
    let set = new Set();
    while (set.size < length) {
        set.add(getRandomNum(low, high));
    }

    return [...set];
}

//burger menu
const burgerIcon = document.querySelector('.burger');
const menu = document.querySelector('.menu');
const burgerLine1 = document.querySelector('.burger__line-1');
const burgerLine2 = document.querySelector('.burger__line-2');
const burgerLine3 = document.querySelector('.burger__line-3');
const overlay = document.querySelector('.overlay');

function handleBurger() {
    let itemsArr = [menu, overlay, burgerLine1, burgerLine2, burgerLine3];
    for (let item of itemsArr) toggleClass(item, 'active');
    body.classList.toggle('stop-scrolling');
}

burgerIcon.addEventListener('click', handleBurger);
document.body.addEventListener('click', (event) => {
    if (event.target.classList.contains('overlay','active')) handleBurger()
});
document.body.addEventListener("touchmove", function(event) {
    event.preventDefault();
    event.stopPropagation();
}, false);

//amount section
const donateInput = document.querySelector('.form__input-field');
const donateAmounts = document.querySelectorAll('.slider__radio');
const slider = document.querySelector('.slider__content');

function limitLength() {
    if (donateInput.value.length > 4) {
        donateInput.value = donateInput.value.slice(0, 4);
    };
    donateInput.value = donateInput.value.replace(/[e,+,-,',','.']/g, '');
}

function checkInput() {
    for (let i = 0; i < donateAmounts.length; i++) {
        if (donateInput.value === donateAmounts[i].value) {
            donateAmounts[i].checked = true;
        } else {
            donateAmounts[i].checked = false;
        }
    }
}

function checkRangebar(e) {
    for (let i = 0; i < donateAmounts.length; i++) {
        if (donateAmounts[i].checked) {
            donateInput.value = donateAmounts[i].value;
            break;
        }
    }
}

checkRangebar();

donateInput.addEventListener('input', limitLength);
donateInput.addEventListener('input', checkInput);
slider.addEventListener('click', checkRangebar);
