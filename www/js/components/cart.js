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

    remove(productId) {
        let countProduit = this.content.filter(x => x === productId).length;
        for (let i = 0, size = countProduit; i < size; i++) {
            let index = this.content.indexOf(productId);
            if (index > -1) {
                this.content.splice(index, 1);
            }
        }
        orinoco.dataManager.saveCart(this.content);
        this.render();
        orinoco.pageManager.showPage('panier');
    }

    plus(productId) {
        this.content.push(productId);
        this.render();
        orinoco.dataManager.saveCart(this.content);
        orinoco.pageManager.showPage('panier');
    }
    moins(productId) {
        let countProduit = this.content.filter(x => x === productId).length;

        let index = this.content.indexOf(productId);
        if (index > -1 && countProduit > 1) {
            this.content.splice(index, 1);
        }

        orinoco.dataManager.saveCart(this.content);
        this.render();
        orinoco.pageManager.showPage('panier');
    }

    updateFromPagePanier(newCart){
      this.content = newCart;
      this.render();
    }

}