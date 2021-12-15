// LES DONNEES DE NOTRE APPLICATIONS
const LISTE_IDEES = [
  {
    id: 1,
    titre: "cours",
    contenu: "juste une proposition pour les heures de cours",
    statut: false,
  },
  {
    id: 2,
    titre: "Brief",
    contenu: "juste une proposition pour les validations",
    statut: true,
  },
  {
    id: 3,
    titre: "Planning",
    contenu: "juste une proposition pour fetes ",
    statut: false,
  },
  {
    id: 4,
    titre: "Cotisations",
    contenu: "Il faut supprimer les cotisations",
    statut: false,
  },
]

// RECUPERATIONS DES ELEMENTS DOM
const propositionElement = document.getElementById("propositions")

LISTE_IDEES.forEach((idee) => {
  const divCard = document.createElement("div")
  divCard.classList.add("card")
  divCard.classList.add("m-2")
  divCard.style.width = "18rem"

  const divCardBody = document.createElement("div")
  divCardBody.classList.add("card-body")

  const cardTitle = document.createElement("h5")
  cardTitle.classList.add("card-title")

  const cardDescription = document.createElement("p")
  cardDescription.classList.add("card-text")

  cardTitle.textContent = idee.titre
  cardDescription.textContent = idee.contenu

  divCardBody.appendChild(cardTitle)
  divCardBody.appendChild(cardDescription)
  divCard.appendChild(divCardBody)
  propositionElement.appendChild(divCard)
})
