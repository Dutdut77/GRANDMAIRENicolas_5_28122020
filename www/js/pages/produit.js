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

    /**
      getData(domTarget) {
          let content = "";
          const products = localStorage.getItem("Produit");
          orinoco.components = new Article(products);       
          content = orinoco.components.afficheDetails();
          domTarget.innerHTML = content;
  
      }
      */

    async getData(domTarget, productId) {
        const specs = await orinoco.dataManager.getProduct(productId);
        const produit = new Article(specs);
        domTarget.innerHTML = produit.afficheDetails();
    }







}