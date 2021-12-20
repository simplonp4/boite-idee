/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const  Database = __webpack_require__(/*! ./database.js */ \"./database.js\")\nconst template = __webpack_require__(/*! ./template.js */ \"./template.js\")\n \nconst API_KEY =\n  \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjM4OTc5MDUxLCJleHAiOjE5NTQ1NTUwNTF9.9zUm7vEolQ-I2qKcxN3NIz2I-o2iAiSoAZzwdy8fO5g\"\nconst API_URL = \"https://pomvfsgmnducyfclngvq.supabase.co/rest/v1/sugests\"\n\nconst database = new Database(API_URL, API_KEY)\n\n// RECUPERATIONS DES ELEMENTS DOM\nconst propositionElement = document.getElementById(\"propositions\")\nconst ideeForm = document.querySelector(\"form\")\nconst inputTitre = document.querySelector(\"input#titre\")\nconst inputSuggestion = document.querySelector(\"textarea#suggestion\")\nlet metrique = {total:0, accepte:0, refuse:0}\n\n// NOS FONCTIONS\n\n/**\n * Cette fonction permet de créer une carte et de l'inserrer dans le DOM\n * @param un idee\n */\nconst creerUneCarte = (idee) => {\n  //création de nos ids\n  const idButtonValider = \"btn_valider-\" + idee.id\n  const idButtonRefuser = \"btn_refuser-\" + idee.id\n  const idCardIdee = \"numero_card-\" + idee.id\n\n  //Insertion de la carte au niveau du DOM\n  propositionElement.insertAdjacentHTML(\n    \"beforeend\", template(idee)\n  )\n\n  //Ajout des évenements  sur les bouttons valider et refuser\n  const btnValider = document.getElementById(idButtonValider)\n  const btnRefuser = document.getElementById(idButtonRefuser)\n\n  function changerStyleCarte(\n    coleurBordure, \n    coleurTitre, \n    titre, \n    statusBtnValider, \n    statusBtnRefuser,\n    classeAsupprimer\n    ) {\n      \n    //On récupere la carde concernée\n    const divCard = document.getElementById(idCardIdee)\n    divCard.style.border = \"1px solid \"+coleurBordure;\n    btnValider.style.visibility = statusBtnValider\n    btnRefuser.style.visibility = statusBtnRefuser\n\n    //Chage le message au niveau du h6\n    const h6 = document.querySelector(\"#\" + idCardIdee + \" h6\")\n    h6.textContent = titre\n    h6.classList.remove(classeAsupprimer)\n    h6.classList.add(\"text-\"+coleurTitre) \n  }\n  if (idee.statut === true) {\n    changerStyleCarte(\"#198754\", \"green\", \"Approuvé\", \"hidden\", \"visible\", \"text-red\");\n  }else{\n    changerStyleCarte(\"#ce0033\", \"red\", \"Refusée\", \"visible\", \"hidden\", \"text-green\");\n  }\n\n  function creerLesDeuxDiagrammeCirculaires() {\n    buildGoogleChart()\n    let pourcentageAccepte = (metrique.accepte*100)/metrique.total\n    let pourcentageRefuse = (metrique.refuse*100)/metrique.total\n    let cercle =  document.querySelector('.percentage')\n    cercle.style.background = `conic-gradient(#198754 ${pourcentageAccepte}%, #ce0033 0)`\n    document.querySelector('.pourcentage-accepte').innerHTML = `${pourcentageAccepte.toFixed(2)}%`\n    document.querySelector('.pourcentage-refuse').innerHTML = `${pourcentageRefuse.toFixed(2)}%`        \n  }\n\n  //Ecouter l'évenement click sur les boutons\n  btnValider.addEventListener(\"click\", (event) => {\n    //on prend l'id de l'idée\n      database.modifier(idee)\n      .then((data) => {\n        if (data[0].statut === true) {\n          changerStyleCarte(\"#198754\", \"green\", \"Approuvé\", \"hidden\", \"visible\", \"text-red\");\n          metrique.accepte++\n          metrique.refuse--\n          creerLesDeuxDiagrammeCirculaires()\n        }\n      })\n  })\n\n  btnRefuser.addEventListener(\"click\", (event) => {\n    //on prend l'id de l'idée\n    database.modifier(idee)\n      .then(data => {\n        if (data[0].statut === false) {\n          //On récupere la carde concernée\n          changerStyleCarte(\"#ce0033\", \"red\", \"Refusée\", \"visible\", \"hidden\", \"text-green\");\n          metrique.accepte--\n          metrique.refuse++\n          creerLesDeuxDiagrammeCirculaires()\n        }\n      })\n  })\n\n  if (idee.statut){\n    metrique.accepte++\n  }else{\n    metrique.refuse++\n  }metrique.total++\n\n  creerLesDeuxDiagrammeCirculaires()\n\n}\n\n// VERIFICATION DES MOTS SAISIS\ninputSuggestion.addEventListener(\"input\", (event) => {\n  const LONGUEURMAX = 130\n  const contenuSaisi = inputSuggestion.value\n  const longueurSaisi = contenuSaisi.length\n  const reste = LONGUEURMAX - longueurSaisi\n\n  //actualiser le dom pour afficher le nombre\n  const paragraphCompteur = document.getElementById(\"limite-text\")\n  const compteurText = document.getElementById(\"text-progress\")\n  const restantText = document.getElementById(\"text-restant\")\n  const btnSuggestion = document.getElementById(\"btn-suggestion\")\n  compteurText.textContent = longueurSaisi\n  restantText.textContent = \" Il vous reste \" + reste\n\n  //changer couleur\n\n  if (reste < 0) {\n    paragraphCompteur.style.color = \"#ce0033\"\n    btnSuggestion.disabled = true\n  } else if (reste <= 16) {\n    paragraphCompteur.style.color = \"yellow\"\n    btnSuggestion.disabled = false\n  } else {\n    paragraphCompteur.style.color = \"#00000\"\n    btnSuggestion.disabled = false\n  }\n})\n\n// RECUPERATION DES INFORMAIONS DU FORMULAIRE\nideeForm.addEventListener(\"submit\", (event) => {\n  event.preventDefault()\n  \n  // Récupération des informations saisies\n  let nouvelleIdee = recuperationSaisi();\n  \n  database.ajouter(nouvelleIdee).then(data => {\n    ideeCreeAuNiveauAPI = data[0]\n    creerUneCarte(ideeCreeAuNiveauAPI)\n  })\n  \n  // on vide les champs\n  inputTitre.value = \"\"\n  inputSuggestion.value = \"\"\n})\n\n\nwindow.addEventListener(\"DOMContentLoaded\", (event) => {\n  //RECUPERATION DES DONNEES VIA API\n  database.recuperer().then( idees => {\n    idees.forEach((idee) => {\n      creerUneCarte(idee)\n    })\n  })\n})\n\nfunction filtrer (elementFiltre, etat) {\n  document.querySelector('.'+elementFiltre).addEventListener('click', ()=>{\n    let cartes = propositionElement.children\n    for (const carte of cartes) {\n      if(carte.getAttribute('data-state') == etat){\n        carte.classList.add('d-none')\n      }else{\n        carte.classList.remove('d-none')\n      }\n    }\n  })\n}\n\nfiltrer('filtre-refuse', 'true')\nfiltrer('filtre-accepte', 'false')\n\ndocument.querySelector('.filtre-tous').addEventListener('click', ()=>{\n  let cartes = propositionElement.children\n  for (const carte of cartes) {\n    carte.classList.remove('d-none')\n  }\n})\n\nfunction buildGoogleChart() {\n  google.charts.load('current', {'packages':['corechart','bar']});\n  google.charts.setOnLoadCallback(drawChart);\n  \n  function drawChart() {\n    // Create the data table.\n    var data = new google.visualization.DataTable();\n    data.addColumn('string', 'Topping');\n    data.addColumn('number', 'Slices');\n    \n    data.addRows([\n      ['accepté', metrique.accepte],\n      ['refusé', metrique.refuse]\n    ]);\n    \n    // Set chart options\n    var options = {'title':'Stats des idées',\n    'colors':['#ce0033', '#198754'],\n    'width':400,\n    'height':250,\n    pieHole: 0.5,\n    pieSliceTextStyle: {\n      color: 'white',\n    },\n  };\n  \n  // Instantiate and draw our chart, passing in some options.\n  var chart = new google.visualization.PieChart(document.getElementById('chart_div'));\n  chart.draw(data, options);\n}\n}\n\nfunction recuperationSaisi(){\n\n  const titreSaisi = inputTitre.value\n  const suggestionSaisi = inputSuggestion.value\n\n  if (titreSaisi.trim().length < 5 || suggestionSaisi.trim().length < 10) {\n    inputTitre.classList.add(\"invalid\")\n    inputSuggestion.classList.add(\"invalid\")\n    alert(\"Merci de saisir des informations correctes\")\n    return\n  }\n\n  // mettre les informations sous forme\n  const nouvelleIdee = {\n    titre: titreSaisi,\n    suggestion: suggestionSaisi,\n    statut: false,\n  }\n  return nouvelleIdee\n}\n\n//# sourceURL=webpack:///./app.js?");

/***/ }),

/***/ "./database.js":
/*!*********************!*\
  !*** ./database.js ***!
  \*********************/
/***/ ((module) => {

eval("class Database {\n    \n    constructor(apiUrl,apiKey){\n        this.apiUrl = apiUrl\n        this.apiKey = apiKey    \n    }\n\n    async ajouter(objet) {\n        const data = await fetch(this.apiUrl, {\n            method: \"POST\",\n            headers: {\n                apiKey: this.apiKey,\n                \"Content-Type\": \"application/json\",\n                Prefer: \"return=representation\",\n            },\n            body: JSON.stringify(objet),\n        })\n\n        return data.json()\n    }\n\n    async recuperer() {\n        const data = await fetch(this.apiUrl, {\n            headers: {\n                apikey: this.apiKey,\n            },\n        })\n\n        return data.json()\n    }\n\n    async modifier(objet) {\n        let data = await fetch(this.apiUrl + \"?id=eq.\" + objet.id, {\n            method: \"PATCH\",\n            headers: {\n                apikey: this.apiKey,\n                \"Content-Type\": \"application/json\",\n                Prefer: \"return=representation\",\n            },\n            body: JSON.stringify({ statut: !objet.statut }),\n        })\n\n        return data.json()\n    }\n\n}\n\nmodule.exports = Database;\n\n//# sourceURL=webpack:///./database.js?");

/***/ }),

/***/ "./template.js":
/*!*********************!*\
  !*** ./template.js ***!
  \*********************/
/***/ ((module) => {

eval("function template(idee) {\n    const idButtonValider = \"btn_valider-\" + idee.id\n    const idButtonRefuser = \"btn_refuser-\" + idee.id\n    const idCardIdee = \"numero_card-\" + idee.id\n    return (`\n        <div class=\"card card-idea m-2\" style=\"width: 18rem\" id=\"${idCardIdee}\" data-state=\"${idee.statut}\">\n            <div class=\"card-body flex-column d-flex justify-content-between\">\n                <div class=\"card-block-titre\">\n                <h5 class=\"card-title fw-bold\">${idee.titre}</h5>\n                <h6 class=\"card-subtitle mb-2 text-gris\">\n                    approuvée / réfusée\n                </h6>\n                </div>\n                <p class=\"card-text\">${idee.suggestion}\n                </p>\n                <div class=\"d-flex justify-content-between\">\n                    <i\n                        class=\"bi bi-check-circle text-success card-link btn\"\n                        id=\"${idButtonValider}\"\n                        style=\"font-size: 2rem\"\n                    ></i>\n                    <i\n                        class=\"bi bi-x-circle card-link btn\"\n                        id=\"${idButtonRefuser}\"\n                        style=\"font-size: 2rem; color: #ce0033\"\n                    ></i>\n                </div>\n            </div>\n        </div>\n    `)\n    \n}\n\nmodule.exports = template;\n\n//# sourceURL=webpack:///./template.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./app.js");
/******/ 	
/******/ })()
;