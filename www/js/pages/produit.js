class Produit {

    /**
     * insert la page d'accueil 
     *
     * @param   {HTMLElement}  domTarget  [domTarget description]
     *
     * @constructor
     */


    constructor(domTarget, productId) {
        
        this.getData(domTarget, productId);
        

    }


    async getData(domTarget, productId) {
        const specs = await orinoco.dataManager.getProduct(productId);
        const produit = new Article(specs);        
        domTarget.innerHTML = produit.afficheDetails();
    }

    





}