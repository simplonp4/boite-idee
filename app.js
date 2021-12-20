const  Database = require('./database.js')
const template = require('./template.js')
 
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjM4OTc5MDUxLCJleHAiOjE5NTQ1NTUwNTF9.9zUm7vEolQ-I2qKcxN3NIz2I-o2iAiSoAZzwdy8fO5g"
const API_URL = "https://pomvfsgmnducyfclngvq.supabase.co/rest/v1/sugests"

const database = new Database(API_URL, API_KEY)

// RECUPERATIONS DES ELEMENTS DOM
const propositionElement = document.getElementById("propositions")
const ideeForm = document.querySelector("form")
const inputTitre = document.querySelector("input#titre")
const inputSuggestion = document.querySelector("textarea#suggestion")
let metrique = {total:0, accepte:0, refuse:0}

// NOS FONCTIONS

/**
 * Cette fonction permet de créer une carte et de l'inserrer dans le DOM
 * @param un idee
 */
const creerUneCarte = (idee) => {
  //création de nos ids
  const idButtonValider = "btn_valider-" + idee.id
  const idButtonRefuser = "btn_refuser-" + idee.id
  const idCardIdee = "numero_card-" + idee.id

  //Insertion de la carte au niveau du DOM
  propositionElement.insertAdjacentHTML(
    "beforeend", template(idee)
  )

  //Ajout des évenements  sur les bouttons valider et refuser
  const btnValider = document.getElementById(idButtonValider)
  const btnRefuser = document.getElementById(idButtonRefuser)

  function changerStyleCarte(
    coleurBordure, 
    coleurTitre, 
    titre, 
    statusBtnValider, 
    statusBtnRefuser,
    classeAsupprimer
    ) {
      
    //On récupere la carde concernée
    const divCard = document.getElementById(idCardIdee)
    divCard.style.border = "1px solid "+coleurBordure;
    btnValider.style.visibility = statusBtnValider
    btnRefuser.style.visibility = statusBtnRefuser

    //Chage le message au niveau du h6
    const h6 = document.querySelector("#" + idCardIdee + " h6")
    h6.textContent = titre
    h6.classList.remove(classeAsupprimer)
    h6.classList.add("text-"+coleurTitre) 
  }
  if (idee.statut === true) {
    changerStyleCarte("#198754", "green", "Approuvé", "hidden", "visible", "text-red");
  }else{
    changerStyleCarte("#ce0033", "red", "Refusée", "visible", "hidden", "text-green");
  }

  function creerLesDeuxDiagrammeCirculaires() {
    buildGoogleChart()
    let pourcentageAccepte = (metrique.accepte*100)/metrique.total
    let pourcentageRefuse = (metrique.refuse*100)/metrique.total
    let cercle =  document.querySelector('.percentage')
    cercle.style.background = `conic-gradient(#198754 ${pourcentageAccepte}%, #ce0033 0)`
    document.querySelector('.pourcentage-accepte').innerHTML = `${pourcentageAccepte.toFixed(2)}%`
    document.querySelector('.pourcentage-refuse').innerHTML = `${pourcentageRefuse.toFixed(2)}%`        
  }

  //Ecouter l'évenement click sur les boutons
  btnValider.addEventListener("click", (event) => {
    //on prend l'id de l'idée
      database.modifier(idee)
      .then((data) => {
        if (data[0].statut === true) {
          changerStyleCarte("#198754", "green", "Approuvé", "hidden", "visible", "text-red");
          metrique.accepte++
          metrique.refuse--
          creerLesDeuxDiagrammeCirculaires()
        }
      })
  })

  btnRefuser.addEventListener("click", (event) => {
    //on prend l'id de l'idée
    database.modifier(idee)
      .then(data => {
        if (data[0].statut === false) {
          //On récupere la carde concernée
          changerStyleCarte("#ce0033", "red", "Refusée", "visible", "hidden", "text-green");
          metrique.accepte--
          metrique.refuse++
          creerLesDeuxDiagrammeCirculaires()
        }
      })
  })

  if (idee.statut){
    metrique.accepte++
  }else{
    metrique.refuse++
  }metrique.total++

  creerLesDeuxDiagrammeCirculaires()

}

// VERIFICATION DES MOTS SAISIS
inputSuggestion.addEventListener("input", (event) => {
  const LONGUEURMAX = 130
  const contenuSaisi = inputSuggestion.value
  const longueurSaisi = contenuSaisi.length
  const reste = LONGUEURMAX - longueurSaisi

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
  let nouvelleIdee = recuperationSaisi();
  
  database.ajouter(nouvelleIdee).then(data => {
    ideeCreeAuNiveauAPI = data[0]
    creerUneCarte(ideeCreeAuNiveauAPI)
  })
  
  // on vide les champs
  inputTitre.value = ""
  inputSuggestion.value = ""
})


window.addEventListener("DOMContentLoaded", (event) => {
  //RECUPERATION DES DONNEES VIA API
  database.recuperer().then( idees => {
    idees.forEach((idee) => {
      creerUneCarte(idee)
    })
  })
})

function filtrer (elementFiltre, etat) {
  document.querySelector('.'+elementFiltre).addEventListener('click', ()=>{
    let cartes = propositionElement.children
    for (const carte of cartes) {
      if(carte.getAttribute('data-state') == etat){
        carte.classList.add('d-none')
      }else{
        carte.classList.remove('d-none')
      }
    }
  })
}

filtrer('filtre-refuse', 'true')
filtrer('filtre-accepte', 'false')

document.querySelector('.filtre-tous').addEventListener('click', ()=>{
  let cartes = propositionElement.children
  for (const carte of cartes) {
    carte.classList.remove('d-none')
  }
})

function buildGoogleChart() {
  google.charts.load('current', {'packages':['corechart','bar']});
  google.charts.setOnLoadCallback(drawChart);
  
  function drawChart() {
    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    
    data.addRows([
      ['accepté', metrique.accepte],
      ['refusé', metrique.refuse]
    ]);
    
    // Set chart options
    var options = {'title':'Stats des idées',
    'colors':['#ce0033', '#198754'],
    'width':400,
    'height':250,
    pieHole: 0.5,
    pieSliceTextStyle: {
      color: 'white',
    },
  };
  
  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}
}

function recuperationSaisi(){

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
  return nouvelleIdee
}