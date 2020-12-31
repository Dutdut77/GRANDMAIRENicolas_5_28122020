class Cart{

    content=[];

    constructor(domTarget){
        this.DOM = document.createElement("cart");
        domTarget.appendChild(this.DOM);
        this.render();
    }

    render(){
        this.DOM.innerText = this.content.length;
    }

    add(productId){
        this.content.push(productId);
        this.render();
    }
}