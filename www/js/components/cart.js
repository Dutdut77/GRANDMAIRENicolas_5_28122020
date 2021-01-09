class Cart {

    content = orinoco.dataManager.reloadCart();

    constructor(domTarget) {

        this.DOM = document.createElement("cart");
        this.domTarget = domTarget;
        this.render();
    }

    render() {

        if (this.content.length > 0) {
            this.domTarget.appendChild(this.DOM);
            this.DOM.innerText = this.content.length;
        }

    }

    add(productId) {
        this.content.push(productId);
        this.render();
        orinoco.dataManager.saveCart(this.content);
    }

    remove(productId) {
        let index = this.content.indexOf(productId);
        if (index > -1) {
            this.content.splice(index, 1);
        }
        
        orinoco.dataManager.saveCart(this.content);
        this.render();
        orinoco.pageManager.changePage('panier');
    }

    plus(productId) {
        this.content.push(productId);
        this.render();
        orinoco.dataManager.saveCart(this.content);
        orinoco.pageManager.changePage('panier');
    }
    moins(productId) {

    }

}