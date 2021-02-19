/* global Article orinoco*/
class Home {

    /**
     * Insert la page d'accueil 
     *
     * @param   {HTMLElement}  domTarget  Balise main
     *
     * @constructor
     */
    constructor(domTarget) {
        this.getData(domTarget);
    }


    /**
     * Récupère les données et affiche la page home dans le DOM
     *  
     * @param   {HTMLElement}  domTarget  Balise main
     * 
     * @returns {void}             Affiche dans le DOM
     */
    async getData(domTarget) {
        let content = "";

        const products = await orinoco.dataManager.getAllProducts();
        for (let i = 0, size = products.length; i < size; i++) {
            orinoco.components["composant_" + products[i]._id] = new Article(products[i]);
            content += orinoco.components["composant_" + products[i]._id].afficheResume();
        }
        domTarget.innerHTML = `
        <div class="titre"><h1>-- Les argentiques -- </h1></div>
        ${content}
        `;
    }
}