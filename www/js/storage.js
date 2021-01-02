class Storage{
  

    constructor(){ 
        
    }


    addProduit (data){        
        const produitStorage = JSON.stringify(data);
        localStorage.setItem('Produit', produitStorage);
    }

    addPanier (){

        panier.unshift(orinoco.cart.content);
        //const cartStorage = JSON.stringify(panier);
        localStorage.removeItem('Panier');
        localStorage.setItem('Panier', panier);

    }


}
    
    
 