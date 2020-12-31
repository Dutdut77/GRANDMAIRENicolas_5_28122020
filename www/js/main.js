const orinoco = {
    dataManager : new DataManager("http://localhost:3000/api/cameras"),
    cart : new Cart(document.querySelector(".shopping_cart_qt")),
    components : {}
}

new Home(document.querySelector("div.liste"));