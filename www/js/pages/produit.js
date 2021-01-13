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
        domTarget.innerHTML = `
          <select name="camera" class="camera" onchange="orinoco.pageManager.changePage('produit_' + this.value)">        
              ${await this.selectCamera(produit.name)}
          </select>
          ${produit.afficheDetails()}
        `;
    }

    

    async selectCamera(nameSelect) {
      let content = "";
      let listeName = "";
      const name = await orinoco.dataManager.getAllProducts();
      for (let i = 0, size = name.length; i < size; i++) {
          content += `<option ${nameSelect === name[i].name ? "selected" : ""} value="${name[i]._id}">${name[i].name}</option>`
      }

      //console.log(content); 
      // document.querySelector(domTarget).innerHTML = content; // Pourquoi je ne peux pas mettre domTarget query selector dans une variable ????
      return content;      // Pourquoi un simple return content ne fonctionne pas. Comme par exemple la fonction showVariants. ????????

      // document.querySelector(domTarget).addEventListener('change', (event) => {
      //     orinoco.pageManager.changePage("produit_" + event.target.value);
      // });

    }
}