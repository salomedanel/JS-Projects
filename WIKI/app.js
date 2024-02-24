// API ENDPOINT : `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`

const form = document.querySelector("form");
const input = document.querySelector("input");
const errorMsg = document.querySelector(".error-msg");
const loader = document.querySelector(".loader");
const resultsDisplay = document.querySelector(".display-result");

form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  if (input.value === "") {
    errorMsg.textContent = "Woops, veuillez saisir une recherche";
    resultsDisplay.textContent = "";
    return;
  } else {
    errorMsg.textContent = "";
    loader.style.display = "flex";
    resultsDisplay.textContent = "";
    wikiApiCall(input.value);
  }
}

// async permet d'attendre le resultat de l'API avant d'executer le reste du code.
async function wikiApiCall(searchInput) {
  try {
    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`
    ); // attend le resultat de la methode fetch
   
    // pour gerer le cas d'une erreur 404, pas renvoyee par fetch, car il y a bien une response, mais avec le status false
    if (!response.ok) {
        throw new Error(`${response.status}`);
    }
    // ensuite on utilise la methode json pour analyser le body du result de la query
    const data = await response.json();
    console.log(data);
    createCard(data.query.search);
    
  } catch (error) {
    errorMsg.textContent = `${error}`;
    loader.style.display = "none";
  }
}

function createCard(queryResult) {
  if (!queryResult.length) {
    errorMsg.textContent = "Aucun resultat pour cette recherche";
  }
  queryResult.forEach((elem) => {
    const url = `https://fr.wikipedia.org/?curid=${elem.pageid}`;
    const card = document.createElement("div"); // cree une div pour les 20 resultats
    card.className = "result-item";
    card.innerHTML = `
        <h3 class="result-title">
                <a href="${url}" target="_blank">${elem.title}</a>
            </h3>
            <a href="${url}" class="result-link" target="_blank">${url}</a>
            <span class="result-snippet">${elem.snippet}</span>
            <br>
        `;
    resultsDisplay.appendChild(card); // rajoute un enfant a la div result-display
  });
  loader.style.display = "none";
}
