import petsInfo from '../../assets/info/pets.js';
import testimonialsInfo from '../../assets/info/testimonials.js';

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

//pets cards generator
const petsCardsContainer = document.querySelector('.pets__wrapper-outer');

let petsCardsAmount = 0;
let petCards = [];

function createPetsCard(cardNum) {
    const cardImageContainer = document.createElement('div');
    cardImageContainer.classList.add('card__image-container');
    cardImageContainer.style.backgroundImage = `url('${petsInfo[cardNum].image}')`;

    const cardTitle = document.createElement('div');
    cardTitle.classList.add('card__title');
    cardTitle.textContent = petsInfo[cardNum].title;

    const cardSubtitle = document.createElement('div');
    cardSubtitle.classList.add('card-subtitle');
    cardSubtitle.textContent = petsInfo[cardNum].subtitle;

    const cardTextContainer = document.createElement('div');
    cardTextContainer.classList.add('card__text-container');
    cardTextContainer.append(cardTitle, cardSubtitle);

    const foodIcon = document.createElement('img');
    if (petsInfo[cardNum].icon === 'banana') {
        foodIcon.classList.add('card__icon_banana');
        foodIcon.src = '../../assets/svg/pets-banana-bamboo.svg';
    } else {
        foodIcon.classList.add('card__icon_meat');
        foodIcon.src = '../../assets/svg/pets-meet-fish.svg';
    }

    const cardInfoContainer = document.createElement('div');
    cardInfoContainer.classList.add('card__info-container');

    if (petsInfo[cardNum].icon === 'banana') {
        foodIcon.classList.add('card__icon_banana');
        cardInfoContainer.classList.add('card__info-container_banana');
    } else {
        foodIcon.classList.add('card__icon_meat');
        cardInfoContainer.classList.add('card__info-container_meat');
    }

    cardInfoContainer.append(cardTextContainer, foodIcon);

    const petsCard = document.createElement('div');
    petsCard.classList.add('pets__card', 'card');
    petsCard.append(cardImageContainer, cardInfoContainer);

    return petsCard;
}

function checkPetsCardAmount() {
    let prevPetsCardAmount = petsCardsAmount;

    if (document.documentElement.clientWidth > 640) petsCardsAmount = 6;
    else petsCardsAmount = 4;

    if (prevPetsCardAmount !== petsCardsAmount) adjustPetCardsAmount();
}

function adjustPetCardsAmount() {
    if (petCards.length === 0) return;

    if (petsCardsAmount === 4) {
        for (let i = 4; i < 6; i++) {
            petCards[i].style.display = 'none';
        }
    } else {
        petCards.forEach(card => card.style.display = 'block');
    }
}

function generatePetsCardsLayout() {
    checkPetsCardAmount(document.documentElement.clientWidth);

    let randomArray = getRandomArray(petsCardsAmount, 0, 23);
    let layoutWrapper = document.createElement('div');
    layoutWrapper.classList.add('pets__slide');

    for (let item of randomArray) {
        layoutWrapper.append(createPetsCard(item));
    }

    return layoutWrapper;
}

window.addEventListener('resize', checkPetsCardAmount);
document.addEventListener('DOMContentLoaded', () => {
    petsCardsContainer.append(generatePetsCardsLayout());
});

//Pets slider
const prevButton = document.querySelector('.pets__arrow-bg_left');
const nextButton = document.querySelector('.pets__arrow-bg_right');

let isClickable = true;

function addPetsCardsLayoutToPage(direction) {
    isClickable = false;
    if (direction === 'next') {
        petsCardsContainer.append(generatePetsCardsLayout());
        petsCardsContainer.lastChild.classList.add('from-right');
        petsCardsContainer.firstChild.classList.add('to-left');
        petsCardsContainer.firstChild.addEventListener('animationend', () => {
            petsCardsContainer.lastChild.classList.remove('from-right');
            petsCardsContainer.firstChild.remove();
            isClickable = true;
        })
    }
    if (direction === 'prev') {
        petsCardsContainer.prepend(generatePetsCardsLayout());
        petsCardsContainer.firstChild.classList.add('from-left');
        petsCardsContainer.lastChild.classList.add('to-right');
        petsCardsContainer.lastChild.addEventListener('animationend', () => {
            petsCardsContainer.firstChild.classList.remove('from-left');
            petsCardsContainer.lastChild.remove();
            isClickable = true;
        })
    }
    petCards = document.querySelectorAll('.card');
}

prevButton.addEventListener('click', () => { if (isClickable) addPetsCardsLayoutToPage('prev')});
nextButton.addEventListener('click', () => { if (isClickable) addPetsCardsLayoutToPage('next')});

//testimonials cards generator
function createTestiomonialsCard(cardNum) {
    const place = document.createElement('span');
    place.classList.add('testimonials__place');
    place.textContent = testimonialsInfo[cardNum].place;

    const dot = document.createElement('span');
    dot.textContent = '•';

    const time = document.createElement('span');
    time.classList.add('testimonials__time');
    time.textContent = testimonialsInfo[cardNum].time;

    const placeTimeContainer = document.createElement('div');
    placeTimeContainer.classList.add('testimonials__place-time');
    placeTimeContainer.append(place, dot, time);

    const userName = document.createElement('div');
    userName.classList.add('testimonials__name');
    userName.textContent = testimonialsInfo[cardNum].name;

    const userInfoContainer = document.createElement('div');
    userInfoContainer.classList.add('testimonials__info')
    userInfoContainer.append(userName, placeTimeContainer);

    const userImage = document.createElement('img');
    userImage.src = testimonialsInfo[cardNum].image;

    const contactsContainer = document.createElement('div');
    contactsContainer.classList.add('testimonials__contacts');
    contactsContainer.append(userImage, userInfoContainer);

    const text = document.createElement('div');
    text.classList.add('testimonials__text');
    text.textContent = testimonialsInfo[cardNum].text;

    const card = document.createElement('div');
    card.classList.add('testimonials__card');
    card.append(contactsContainer, text);

    return card;
}

function generateTestimonialsLayout() {
    let randomArray = getRandomArray(testimonialsInfo.length, 0, 16);
    let layoutContainer = document.querySelector('.testimonials__cards');

    for (let item of randomArray) {
        layoutContainer.append(createTestiomonialsCard(item));
    }
}

generateTestimonialsLayout();

//testimonials slider
const cardsContainer = document.querySelector('.testimonials__cards');
const testimonialsInput = document.getElementById('testimonials');
const card = document.querySelector('.testimonials__card');
const cardWidth = parseInt(getComputedStyle(card).width);

function moveSlider() {
    cardsContainer.style.transform = `translateX(-${testimonialsInput.value * (cardWidth + 30)}px)`;
}

testimonialsInput.addEventListener('input', moveSlider);

//testimonials popups
const popupWrapper = document.querySelector('.popup-wrapper');

function showPopup(e) {
    if (e.target != e.currentTarget) {
        generatePopup(e.target.closest('.testimonials__card'));
        body.classList.add('stop-scrolling');

        e.stopPropagation();
    }
}

function generatePopup(card) {
    const popupCard = card.cloneNode(true);
    const shadow = document.createElement('div')
    const closeIcon = document.createElement('img');

    closeIcon.classList.add('popup__close');
    closeIcon.src = '../../assets/svg/testimonials-close.svg';

    shadow.classList.add('shadow');
    popupCard.prepend(closeIcon);
    popupCard.classList.add('popup');
    popupWrapper.append(popupCard, shadow);
    popupWrapper.classList.add('popup-wrapper_visible');

    popupCard.querySelector('.testimonials__text').classList.add('show-hidden-text');

    shadow.addEventListener('click', closePopup);
    closeIcon.addEventListener('click', closePopup);
}

function closePopup() {
    popupWrapper.classList.add('opacity-reverse');
    popupWrapper.classList.remove('popup-wrapper_visible');
    body.classList.remove('stop-scrolling');
    popupWrapper.innerHTML = '';
}

cardsContainer.addEventListener('click', showPopup);
