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


        getData(domTarget){         
          let content = "";
          const products = JSON.parse(window.localStorage.getItem("Produit"));
          orinoco.components = new Article(products);
          content =  orinoco.components.afficheDetails();
          domTarget.innerHTML = content;  
         
    }

    

}