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
          <select name="camera" class="camera" onchange="orinoco.pageManager.changePage('produit_' + this.value, 'Oricono - Camera '+this.options[this.selectedIndex].text)">        
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
        return content;

    }
}