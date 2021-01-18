class Cart {

    content = orinoco.dataManager.reloadCart();

    constructor(domTarget) {

        this.DOM = document.createElement("cart");
        this.domTarget = domTarget;
        this.render();
    }

    render() {

        if (this.content.length > 0) {
            if (!this.domTarget.hasChildNodes()) this.domTarget.appendChild(this.DOM);
            this.DOM.innerText = this.content.length;
            return;
        }
        if (this.domTarget.hasChildNodes()) this.domTarget.removeChild(this.DOM);
    }

    add(productId) {
        this.content.push(productId);
        this.render();
        orinoco.dataManager.saveCart(this.content);
    }



    updateFromPagePanier(newCart){
      this.content = newCart;
      this.render();
    }

}