/* global Cart PageManager DataManager*/


/**
 * objet regroupant tous les éléments du site
 *
 * @type {Object}
 * 
 */

const orinoco = {
    dataManager: new DataManager("http://localhost:3000/api/cameras"),
    components: {}
};

orinoco.cart = new Cart(document.querySelector(".shopping_cart")),
orinoco.pageManager = new PageManager(document.querySelector("main"));


