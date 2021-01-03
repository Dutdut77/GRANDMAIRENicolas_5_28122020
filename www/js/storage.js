class Storage {


    constructor() {

    }


    addProduit(data) {
        // const produitStorage = JSON.stringify(data);
        localStorage.setItem('Produit', data);
    }

    addPanier(data) {

        localStorage.removeItem('Panier');
        panier.push(data);
        //const cartStorage = JSON.stringify(panier);

        localStorage.setItem('Panier', panier);

    }


}


