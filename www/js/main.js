const orinoco = {
    dataManager: new DataManager("http://localhost:3000/api/cameras"),
    cart: new Cart(document.querySelector(".shopping_cart")),
    storage: new Storage(),
    components: {},
    productsCamera: localStorage.getItem("Produit"),
    panier : localStorage.getItem("Panier")
}



if (localStorage.getItem("Panier") == null) {
    panier = [];
}
else {
    panier = [localStorage.getItem("Panier")];
}




var nom_url = window.location.pathname;
nom_url = nom_url.split("/");
nom_url = nom_url[nom_url.length - 1];

if (nom_url == "" || nom_url == "index.html") {
    new Home(document.querySelector("div.liste"));
}
if (nom_url == "produit.html") {
    new Select(document.querySelector("select.camera"));

    new Prod(document.querySelector("div.produit"));

}


const elt = document.querySelector("select.camera");   // On récupère l'élément sur lequel on veut détecter le clic    
elt.addEventListener('change', function () {          // On écoute l'événement change
    orinoco.productsCamera = event.target.value;         // On ajoute le nouvel id dans la variable.
    new Prod(document.querySelector("div.produit"));     //On relanceune instance de Prod.
});