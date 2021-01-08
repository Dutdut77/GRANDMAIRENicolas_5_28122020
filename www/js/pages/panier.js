class Panier {

    /**
     * insert la page d'accueil 
     *
     * @param   {HTMLElement}  domTarget  [domTarget description]
     *
     * @constructor
     */
    constructor(domTarget) {
        this.getData(domTarget);
    }


    /**
     * recupère les données et affiche la page home dans le DOM
     *  
     * @param   {HTMLElement}  domTarget  [domTarget description]
     * 
     * @returns {void}                     affiche dans le DOM
     */




    async getData(domTarget) {
        let content = "";

        const productId = orinoco.dataManager.reloadCart();
        console.log(productId.length);
        for (let i = 0, size = productId.length; i < size; i++) {

            const specs = await orinoco.dataManager.getProduct(productId[i]);
            const produit = new Article(specs);
            content += produit.affichePanier();

        }
        domTarget.innerHTML = content;

    }


}
