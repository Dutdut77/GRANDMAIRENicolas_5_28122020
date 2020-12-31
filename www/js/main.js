const orinoco = {
    dataManager: new DataManager("http://localhost:3000/api/cameras"),
    cart: new Cart(document.querySelector(".shopping_cart")),
    storage: "orinoco.cart.content",
    components: {}
}


var nom_url = window.location.pathname;
nom_url = nom_url.split("/");
nom_url = nom_url[nom_url.length - 1];

if (nom_url == "" || nom_url == "index.html") {
    new Home(document.querySelector("div.liste"));
}
if (nom_url == "produit.html") {
    new Prod(document.querySelector("div.produit"));
}
