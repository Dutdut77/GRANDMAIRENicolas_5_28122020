class Panier{

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
        let products = "";
        content = orinoco.dataManager.reloadCart();
        //const products = await orinoco.dataManager.getAllProducts();
        for (let i = 0, size = content.length; i < size; i++) {
            products = new Article(orinoco.components.composant_content[i]);
            content += products.afficheResume();
        }
        domTarget.innerHTML = content;
  
  
  console.log(content)  }
}