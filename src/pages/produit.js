class Produit {

    /**
     * Récupère le domTarget et l'id de la caméra
     *
     * @param   {HTMLElement}  domTarget  [Target de la page produit]
     *
     * @constructor
     */
    constructor(domTarget, productId) {

        this.getData(domTarget, productId);

    }

    /**
     * [Affiche la page produit]
     *
     * @param   {HTMLElement}  domTarget  [Target de la page produit]
     * @param   {id}  productId  [id du produit demmandé]
     *
     * @return  {[type]}             [Affiche dans le DOM]
     */
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


    /**
     * [Donne les options pour le SELECT des caméras]
     *
     * @param   {[id]}  nameSelect  [id de la caméra selectionné]
     *
     * @return  {[HTML]}              [Liste des options]
     */
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