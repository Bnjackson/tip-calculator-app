"use strict";

const billInput = document.querySelector('#billInput');
const tipChoices = document.querySelectorAll('.tip-choices');
const customTipChoice = document.querySelector('#customTipChoice');
const numPeopleInput = document.querySelector('#numOfPeople');
const resetBtn = document.querySelector('#resetBtn');
const tipAmount = document.querySelector('#tipAmount');
const total = document.querySelector('#total');

let billValue;
let tipPercentage;
let numOfPeople;

billInput.addEventListener('input', (event) => {
    console.log(event.target.value);
    billValue = Number(event.target.value);
    calculateTip();
});

tipChoices.forEach((choice) => {
    choice.addEventListener('click', (event) => {
        getTipChoice(event.target.innerText, 'button', event.target)
    });
    calculateTip();
});

customTipChoice.addEventListener('input', (event) => {
    getTipChoice(event.target.value, 'input', event.target);
    calculateTip();
});

numPeopleInput.addEventListener('input', (event) => {
    numOfPeople = Number(event.target.value);
    calculateTip();
});

resetBtn.addEventListener('click', () => {
    resetInputs();
});

function getTipChoice(tipValue, elementType, eventTarget) {
    let updatedTipValue;
    if (elementType === 'button') {
        updatedTipValue = Number(tipValue.slice(0, -1)); 
    } else {
        updatedTipValue = Number(tipValue);
    }
    tipPercentage = updatedTipValue;
    activeTipChoice(elementType, eventTarget);
}

function activeTipChoice(elementType, eventTarget) {
    removeActiveClass();
    if (elementType === 'button') {
        eventTarget.classList.add('active-tip-btn');
    } else {
        eventTarget.classList.add('active-tip-input');
    }
}

function removeActiveClass() {
    for (let i = 0; i < tipChoices.length; i++) {
        tipChoices[i].classList.remove('active-tip-btn');
    }
    customTipChoice.classList.remove('active-tip-input');
}

function calculateTip() {
    if (billValue && tipPercentage && numOfPeople) {
        const tipAmount = (tipPercentage * billValue) / 100;
        const totalPerPerson = (billValue + tipAmount) / numOfPeople;
        const tipPerPerson = tipAmount /numOfPeople;
        updateResults(totalPerPerson.toFixed(2), tipPerPerson.toFixed(2));
    }
}

function updateResults(totalPerPerson, tipPerPerson) {
    tipAmount.innerText = `$${tipPerPerson}`;
    total.innerText = `$${totalPerPerson}`;
}

function resetInputs() {
    billValue = 0;
    tipPercentage = 0;
    numOfPeople = 0;
    removeActiveClass();
    tipAmount.innerText = '$0.00';
    total.innerText = '$0.00';
    billInput.value = '';
    numPeopleInput.value = '';
    customTipChoice.value = '';
}