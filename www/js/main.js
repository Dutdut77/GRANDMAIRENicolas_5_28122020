const orinoco = {
    dataManager: new DataManager("http://localhost:3000/api/cameras"),
    components: {}
   
}

orinoco.cart = new Cart(document.querySelector(".shopping_cart")),
orinoco.pageManager = new PageManager(document.querySelector("main"));
orinoco.select = new Select();