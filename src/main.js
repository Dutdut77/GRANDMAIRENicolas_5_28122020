/**
 * [Récupère les données de l'API]
 *
 * @param   {URL}  http://localhost:3000/api/cameras  [Lien de l'API]
 *
 * @return  {JSON}                                     [Retourne la liste des cameras vendu sur le site]
 */

/**
 * objet regroupant tous les éléments du site
 *
 * @type {Object}
 */
const orinoco = {
    dataManager: new DataManager("http://localhost:3000/api/cameras"),
    components: {}
}

orinoco.cart = new Cart(document.querySelector(".shopping_cart")),
orinoco.pageManager = new PageManager(document.querySelector("main"));


