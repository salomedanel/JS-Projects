const inputs = document.querySelectorAll("input");

inputs.forEach((input) => {
  input.addEventListener("invalid", handleValidation);
  input.addEventListener("input", handleValidation);
});

function handleValidation(e) {
  if (e.type === "invalid") {
    e.target.setCustomValidity("Ce champ ne peut etre vide");
  } else if (e.type === "input") {
    e.target.setCustomValidity("");
  }
}

const cookieForm = document.querySelector("form");

cookieForm.addEventListener("submit", handleForm);

function handleForm(e) {
  e.preventDefault();

  const newCookie = {}; // on cree un objet cookie

  inputs.forEach((input) => {
    const nameAttribute = input.getAttribute("name");
    newCookie[nameAttribute] = input.value;
  });
  newCookie.expires = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000); // permet de faire expirer le cookie dans 1 semaine from now()
  cookieForm.reset();
  const firstInput = document.querySelector("#name");
  console.log(firstInput);
  firstInput.focus();
  createCookie(newCookie);
}

function createCookie(newCookie) {

  if (doesCookieExist(newCookie.name)) {
      createToast({name: newCookie.name, state: "modifié", color: "#E2941E"}); // on passe un objet a la fonction
    } else {
    createToast({name: newCookie.name, state: "créé", color: "#2AB459"});
  }

  document.cookie = `${encodeURIComponent(newCookie.name)}=${encodeURIComponent(
    newCookie.value
  )};expires=${newCookie.expires.toUTCString()};priority=${encodeURIComponent(
    "High"
  )}`; //encodeURIComponent permet d'encorder du texte

  if (cookiesList.children.length)
    displayCookies();
}

function doesCookieExist(name) {
    const cookies = document.cookie.replace(/\s/g, "").split(";"); //enleve les espaces dans la liste de cookies et les split sur le ;
    const cookiesName = cookies.map(cookie => cookie.split("=")[0]); // map retourne un nouveau tableau avec le resultat de la fonction passee en param
    let cookieExists = false;
    cookiesName.forEach(elem => {
        if (elem === name) {
            cookieExists = true;
            return (cookieExists);}
    });
    return (cookieExists);
}

const toastContainer = document.querySelector(".toast-container");

function createToast({name, state, color}) { // on cree des parametres a partir des props passees dans le fonction -> destructuring
    const toastInfo = document.createElement("p");
    toastInfo.className = "toast";
    toastInfo.textContent = `Cookie ${name} ${state}.`;
    toastInfo.style.backgroundColor = `${color}`;
    toastContainer.appendChild(toastInfo);

    setTimeout(() => {
        toastInfo.remove();
    },  2500) // permet de declencher la fonction callback au bout de 2,5 secondes. Ici c'est pour enlever le toast en bas de la page
}

const cookiesList = document.querySelector(".cookie-list");
const displayCookieBtn = document.querySelector(".display-cookie-btn");
const infoTxt = document.querySelector(".txt-info");

displayCookieBtn.addEventListener("click", displayCookies);

function displayCookies() {

    if (cookiesList.children.length)
        cookiesList.textContent = ""; // permet de ne pas rafficher un cookie síl est deja affiche

    let lock = false; // va permettre de bloquer l'appui sur le bouton tant que le setTimeOut n'est pas termine
    const cookies = document.cookie.replace(/\s/g, "").split(";").reverse();
    
    if (!cookies[0]) {
        if (lock) return;

        lock = true;
        infoTxt.textContent = "Pas de cookies à afficher. Créez-en un !";
        setTimeout(() => {
            infoTxt.textContent = "";
            lock = false;
        }, 2000);
        return;
    }
    createElements(cookies);
}

function createElements(cookies) {

    cookies.forEach(cookie => {

        const formatCookie = cookie.split("=");
        const listItem = document.createElement("li");
        const name = decodeURIComponent(formatCookie[0]);
        listItem.innerHTML = `
        <p>
            <span>Nom</span>: ${name}
        </p>
        <p>
            <span>Valeur</span>: ${decodeURIComponent(formatCookie[1])}
        </p>
        <button>x</button>
        `;
        listItem.querySelector("button").addEventListener("click", e => {
            createToast({name: name, state: "supprimé", color: "crimson"});
            document.cookie = `${formatCookie[0]}=;expires=${new Date(0)}`; // met la date d'expiration a une date anterieure, donc le suppr
            e.target.parentElement.remove();
        })
        cookiesList.appendChild(listItem);
    })
}