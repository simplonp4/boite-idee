const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzOTUwNTA3NiwiZXhwIjoxOTU1MDgxMDc2fQ.nugD6bl641l6KFBgo9SgmnpWuNJDR0K9rfH6ZHVAHgo"

const API_URL = "https://mjfhxhlnaztdifgwfnjj.supabase.co/rest/v1/idees"

// RECUPERATIONS DES ELEMENTS DOM
const propositionElement = document.getElementById("propositions")
const ideeForm = document.querySelector("form")
const inputTitre = document.querySelector("input#titre")
const inputSuggestion = document.querySelector("textarea#suggestion")

// NOS FONCTIONS

/**
 * Cette fonction permet de créer une carte et de l'inserrer dans le DOM
 * @param un idee
 */
const creerUneCarte = (idee) => {
  //création de nos ids
  const idButtonValider = "btn_valider-" + idee.id
  const idButtonRefuser = "btn_refuser-" + idee.id

  //Insertion de la carte au niveau du DOM
  propositionElement.insertAdjacentHTML(
    "beforeend",
    `
  <div class="card card-idea m-2" style="width: 18rem">
      <div class="card-body flex-column d-flex justify-content-between">
          <div class="card-block-titre">
            <h5 class="card-title fw-bold">${idee.titre}</h5>
            <h6 class="card-subtitle mb-2 text-muted">
                approuvée / réfusée
            </h6>
          </div>
          <p class="card-text">${idee.suggestion}
          </p>
          <div class="d-flex justify-content-between">
              <i
                  class="bi bi-check-circle text-success card-link btn"
                  id="${idButtonValider}"
                  style="font-size: 2rem"
              ></i>
              <i
                  class="bi bi-x-circle card-link btn"
                   id="${idButtonRefuser}"
                  style="font-size: 2rem; color: #ce0033"
              ></i>
          </div>
      </div>
  </div>
  `
  )

  //Ajout des évenements  sur les bouttons valider et refuser
  const btnValider = document.getElementById(idButtonValider)
  const btnRefuser = document.getElementById(idButtonRefuser)

  //Ecouter l'évenement click sur les boutons
  btnValider.addEventListener("click", (event) => {
    alert("on veut valider")
  })

  btnRefuser.addEventListener("click", (event) => {
    alert("ont veut refuser")
  })
}

// VERIFICATION DES MOTS SAISIS
inputSuggestion.addEventListener("input", (event) => {
  const longueurMax = 130
  const contenuSaisi = inputSuggestion.value
  const longueurSaisi = contenuSaisi.length
  const reste = longueurMax - longueurSaisi

  //actualiser le dom pour afficher le nombre
  const paragraphCompteur = document.getElementById("limite-text")
  const compteurText = document.getElementById("text-progress")
  const restantText = document.getElementById("text-restant")
  const btnSuggestion = document.getElementById("btn-suggestion")
  compteurText.textContent = longueurSaisi
  restantText.textContent = " Il vous reste " + reste

  //changer couleur

  if (reste < 0) {
    paragraphCompteur.style.color = "#ce0033"
    btnSuggestion.disabled = true
  } else if (reste <= 16) {
    paragraphCompteur.style.color = "yellow"
    btnSuggestion.disabled = false
  } else {
    paragraphCompteur.style.color = "#00000"
    btnSuggestion.disabled = false
  }
})

// RECUPERATION DES INFORMAIONS DU FORMULAIRE
ideeForm.addEventListener("submit", (event) => {
  event.preventDefault()

  // Récupération des informations saisies
  const titreSaisi = inputTitre.value
  const suggestionSaisi = inputSuggestion.value

  if (titreSaisi.trim().length < 5 || suggestionSaisi.trim().length < 10) {
    inputTitre.classList.add("invalid")
    inputSuggestion.classList.add("invalid")
    alert("Merci de saisir des informations correctes")
    return
  }

  // mettre les informations sous forme
  const nouvelleIdee = {
    titre: titreSaisi,
    suggestion: suggestionSaisi,
    statut: false,
  }

  //ENVOYER LES DONNEES VERS SUPABASE
  fetch(API_URL, {
    method: "POST",
    headers: {
      apikey: API_KEY,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(nouvelleIdee),
  })
    .then((response) => response.json())
    .then((data) => {
      ideeCreeAuNiveauAPI = data[0]
      //AJOUT DE LA NOUVELLE IDEE AU NIVEAU DE LA PAGE
      creerUneCarte(ideeCreeAuNiveauAPI)
    })

  // on vide les champs
  inputTitre.value = ""
  inputSuggestion.value = ""
})

// AFFICHAGE DE LA DES IDEES
window.addEventListener("DOMContentLoaded", (event) => {
  //RECUPERATION DES DONNEES VIA API
  fetch(API_URL, {
    headers: {
      apikey: API_KEY,
    },
  })
    .then((response) => response.json())
    .then((idees) => {
      idees.forEach((idee) => {
        creerUneCarte(idee)
      })
    })
})
