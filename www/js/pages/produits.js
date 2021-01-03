class Prod {

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
      getData(domTarget) {
          let content = "";
          const products = localStorage.getItem("Produit");
          orinoco.components = new Article(products);       
          content = orinoco.components.afficheDetails();
          domTarget.innerHTML = content;
  
      }
      */

    async getData(domTarget) {
        let content = "";
        const products = await orinoco.dataManager.getAllProducts();
        //new Article(orinoco.components["composant_"+orinoco.productsCamera]);
        content += orinoco.components["composant_" + orinoco.productsCamera].afficheDetails();
        domTarget.innerHTML = content;
    }




}