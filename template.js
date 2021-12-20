function template(idee) {
    const idButtonValider = "btn_valider-" + idee.id
    const idButtonRefuser = "btn_refuser-" + idee.id
    const idCardIdee = "numero_card-" + idee.id
    return (`
        <div class="card card-idea m-2" style="width: 18rem" id="${idCardIdee}" data-state="${idee.statut}">
            <div class="card-body flex-column d-flex justify-content-between">
                <div class="card-block-titre">
                <h5 class="card-title fw-bold">${idee.titre}</h5>
                <h6 class="card-subtitle mb-2 text-gris">
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
    `)
    
}

module.exports = template;