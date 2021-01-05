class Select {

    /**
     * insert la page d'accueil 
     *
     * @param   {HTMLElement}  domTarget  [domTarget description]
     *
     * @constructor
     */
    constructor() {
        this.getData();
    }


    /**
     * recupère les données et affiche la page home dans le DOM
     *  
     * @param   {HTMLElement}  domTarget  [domTarget description]
     * 
     * @returns {void}                     affiche dans le DOM
     */
    async getData() {
        let content = "";

        const products = await orinoco.dataManager.getAllProducts();
        for (let i = 0, size = products.length; i < size; i++) {
            orinoco.components["composant_" + products[i]._id] = new Article(products[i]);
            content += `<option value="${this.lenses[i]}"> ${this.lenses[i]}</option>`;
        }
        return content;
    }
}

