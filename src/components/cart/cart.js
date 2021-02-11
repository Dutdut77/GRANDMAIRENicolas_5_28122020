class Cart {

    content = orinoco.dataManager.reloadCart();

    /**
     * [Insert le nombre d'article dans le panier]
     *
     * @param   {[HTMLElement]}  domTarget  [cible]
     *
     */
    constructor(domTarget) {
        this.DOM = document.createElement("cart");
        this.domTarget = domTarget;
        this.render();
    }

    /**
     * [Actualise le nombre d'article dans le panier]
     *
     * @return  {[number]}  [Nombre d'article dans le panier]
     */
    render() {

        if (this.content.length > 0) {
            if (!this.domTarget.hasChildNodes()) this.domTarget.appendChild(this.DOM);
            this.DOM.innerText = this.content.length;
            return;
        }
        if (this.domTarget.hasChildNodes()) this.domTarget.removeChild(this.DOM);
    }


    /**
     * [Ajoute un article dans le panier]
     *
     * @param   {[id]}  productId  [Id de la caméra ajoutée]
     *
     * @return  {[type]}             [Nouveau rendu + actualisation du LocalStorage]
     */
    add(productId) {
        this.content.push(productId);
        this.render();
        orinoco.dataManager.saveCart(this.content);
    }


    /**
     * [updateFromPagePanier description]
     *
     * @param   {[type]}  newCart  [newCart description]
     *
     * @return  {[type]}           [return description]
     */
    updateFromPagePanier(newCart) {
        this.content = newCart;
        this.render();
    }

}