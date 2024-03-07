const inputsValidity = {
    user: false,
    email: false,
    password: false,
    passwordConfirm: false
}

const form = document.querySelector("form");
const container = document.querySelector(".container");

form.addEventListener("submit", handleForm);

let isAnimating = false;

function handleForm(e) {
    e.preventDefault();
    const keys = Object.keys(inputsValidity); // methode qui retourne un tableau contenant les cles de l'objet inputsValidity
    const failedInputs = keys.filter(key => !inputsValidity[key]);
    
    if (failedInputs.length > 0 && !isAnimating) {
        isAnimating = true;
        container.classList.add("shake");
        setTimeout(() => {
            container.classList.remove("shake");
            isAnimating = false;
        }, 400);

        failedInputs.forEach(input => {
            const index = keys.indexOf(input);
            displayValidation({index: index, validation: false});
        });
    }
    else
        alert(`Formulaire pour ${userInput.value} envoyé !`);
}

const validationsIcons = document.querySelectorAll('.icon-verif');
const validationsTexts = document.querySelectorAll('.error-msg');

const userInput = document.querySelector(".input-group:nth-child(1) input");

userInput.addEventListener("blur", userValidation); // When the user clicks outside the input field
userInput.addEventListener("input", userValidation);

function userValidation() {
    if (userInput.value.length >= 3) {
        displayValidation({index: 0, validation: true});
        inputsValidity.user = true;
    }
    else {
        displayValidation({index: 0, validation: false});
        inputsValidity.user = false;
    }
}

const emailInput = document.querySelector(".input-group:nth-child(2) input");

emailInput.addEventListener("blur", emailValidation);
emailInput.addEventListener("input", emailValidation);

const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // format email en regex

function emailValidation() { 
    if (regexEmail.test(emailInput.value)) {
        displayValidation({index: 1, validation: true});
        inputsValidity.email = true;
    }
    else {
        displayValidation({index: 1, validation: false});
        inputsValidity.email = false;
    }
}

function displayValidation({index, validation}){
    if (validation){
        validationsIcons[index].style.display = "inline";
        validationsIcons[index].src = "check.svg";
        if (validationsTexts[index]) validationsTexts[index].style.display = "none";
    }
    else {
        validationsIcons[index].style.display = "inline";
        validationsIcons[index].src = "error.svg";
        if (validationsTexts[index]) validationsTexts[index].style.display = "block";
    }
}

const pswInput = document.querySelector(".input-group:nth-child(3) input");

pswInput.addEventListener("blur", passwordValidation);
pswInput.addEventListener("input", passwordValidation);

// on cree un objet pour les differents elements de validation du mdp
const pswVerification = {
    length: false,
    symbol: false,
    number: false,
}

const regexPsw = {
    symbol: /[^a-zA-Z0-9\s]/,
    number: /[0-9]/,
}

function passwordValidation() {
    let validationResult = 0;
    for (const prop in pswVerification) {
        if(prop === "length"){
            if(pswInput.value.length < 6){
                pswVerification[prop] = false;
            }
            else {
                pswVerification[prop] = true;
                validationResult++;
            }
            continue;
        }

        if (regexPsw[prop].test(pswInput.value)) {
            pswVerification[prop] = true;
            validationResult++;
        }
        else
            pswVerification[prop] = false;
    }
    displayPswValidation(validationResult);
}

const lines = document.querySelectorAll(".lines");
const faible = document.querySelector(".l1");
const moyenne = document.querySelector(".l2");
const forte = document.querySelector(".l3");

function displayPswValidation(result) {
    if (!pswInput.value) {
        validationsIcons[2].style.display = "none";
        faible.style.display = "none";
        moyenne.style.display = "none";
        forte.style.display = "none";
        inputsValidity.password = false;
    }
    else if (result === 0 || result === 1 && pswInput.value.length !== 0) {
        validationsIcons[2].style.display = "inline";
        validationsIcons[2].src = "error.svg";
        faible.style.display = "block";
        moyenne.style.display = "none";
        forte.style.display = "none";
        inputsValidity.password = false;
    }
    else if (result === 2) {
        validationsIcons[2].style.display = "inline";
        validationsIcons[2].src = "error.svg";
        faible.style.display = "block";
        moyenne.style.display = "block";
        forte.style.display = "none";
        inputsValidity.password = false;
    }
    else if (result === 3) {
        validationsIcons[2].style.display = "inline";
        validationsIcons[2].src = "check.svg";
        faible.style.display = "block";
        moyenne.style.display = "block";
        forte.style.display = "block";
        inputsValidity.password = true;
    }
}

const pswConfirm = document.querySelector(".input-group:nth-child(4) input");


pswConfirm.addEventListener("blur", passwordConfirmation);
pswConfirm.addEventListener("input", passwordConfirmation);

function passwordConfirmation() {
    if (!pswConfirm.value)
        validationsIcons[3].style.display = "none";
    else if (pswInput.value === pswConfirm.value) {
        displayValidation({index: 3, validation: true})
        inputsValidity.passwordConfirm = true;
    }
    else {
        displayValidation({index: 3, validation: false});
        inputsValidity.passwordConfirm = false;
    }
}

