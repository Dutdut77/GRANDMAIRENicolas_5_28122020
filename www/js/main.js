const orinoco = {
    dataManager: new DataManager("http://localhost:3000/api/cameras"),
    storage: new Storage(),
    components: {},
    productsCamera: localStorage.getItem("Produit")
}
orinoco.cart = new Cart(document.querySelector(".shopping_cart")),
orinoco.pageManager = new PageManager(document.querySelector("main"));
