class Storage{


    constructor(data){
        this.data = data;
        this.addProduit();
        
    }


    addProduit (){
        let produitStorage = JSON.stringify(this.data);
        localStorage.setItem('Produit', produitStorage);
    }

    addPanier (){
        let cartStorage = JSON.stringify(orinoco.cart.content);
        localStorage.setItem('Panier', cartStorage);
    }


}
    
    
 