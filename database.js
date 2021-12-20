class Database {
    
    constructor(apiUrl,apiKey){
        this.apiUrl = apiUrl
        this.apiKey = apiKey    
    }

    async ajouter(objet) {
        const data = await fetch(this.apiUrl, {
            method: "POST",
            headers: {
                apiKey: this.apiKey,
                "Content-Type": "application/json",
                Prefer: "return=representation",
            },
            body: JSON.stringify(objet),
        })

        return data.json()
    }

    async recuperer() {
        const data = await fetch(this.apiUrl, {
            headers: {
                apikey: this.apiKey,
            },
        })

        return data.json()
    }

    async modifier(objet) {
        let data = await fetch(this.apiUrl + "?id=eq." + objet.id, {
            method: "PATCH",
            headers: {
                apikey: this.apiKey,
                "Content-Type": "application/json",
                Prefer: "return=representation",
            },
            body: JSON.stringify({ statut: !objet.statut }),
        })

        return data.json()
    }

}

module.exports = Database;