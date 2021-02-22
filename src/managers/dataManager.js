class DataManager {

  products = null;
  src;


  /**
   * Récupère le lien de l'API
   *
   * @param   {URL}  src  Lien de l'API
   *
   */
  constructor(src) {
    this.src = src;
  }

  /**
   * Récupère toutes les données de toutes les cameras
   *
   * @return  {Object}  JSON de toutes les cameras
   */
  async getAllProducts() {
    const data = await fetch(this.src);
    this.products = await data.json();
    return this.products;

  }

  /**
   * Récupère toutes les données d'une seule caméra
   *
   * @param   {String}  productId  ID d'une caméra
   *
   * @return  {Object}             JSON des données d'une caméra
   */
  async getProduct(productId) {
    try{
      if (this.products !== null) return this.findInProducts(productId);
      const data = await fetch(this.src + "/" + productId);
      return await data.json();
    }
    catch(err){
      console.error(err);
      alert("nous un souci technique");
    }


  }

  /**
   * Envoi le panier validé vers l'API
   *
   * @param   {Array}  user  Tableau comprenant la liste des articles ainsi que les ID des articles commandés
   *
   * @return  {Object}       Récap de la commande + numéro de commande
   */
  async postPanier(user) {
    try{
      const contact = JSON.stringify(user);
      const option = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: contact
      }
  
      const data = await fetch(this.src + "/order", option);
      return await data.json();

    }
    catch(err){
      console.error(err);
      alert("souci technique");
    }
  }



  /**
   * Recherche dans 'products' si 'productId' existe
   *
   * @param   {String}  productId  Id de la caméra
   *
   * 
   * @return  {Object}  Contenu de tous les éléments de la caméra.
   * 
   */
  findInProducts(productId) {
    for (let i = 0, size = this.products.length; i < size; i++) {
      if (this.products[i]._id === productId) return this.products[i];
    }
    throw ("can't find product");
  }



  /**
   * Sauvegarde le panier dans le localStorage
   *
   * @param   {Array}  cartContent  Array comprenant les ID des cameras commandées
   *
   */
  saveCart(cartContent) {
    localStorage.setItem("cart", JSON.stringify(cartContent));
  }

  /**
   * Charge le panier à partir du localStorage
   *
   * @return  {Object}  Contenu du panier en JSON
   */
  reloadCart() {
    const content = localStorage.getItem("cart");
    if (content === null) return [];
    return JSON.parse(content);
  }

  /**
   * Vide le localStorage (Panier)
   *
   * @return  {void}  Cart localStorage vide + redirection page d'accueil
   */
  deletePanier() {
    localStorage.clear(Cart);
    orinoco.cart.content = [];
    orinoco.cart.render();
    orinoco.pageManager.changePage('', 'Orinoco - Vente de caméras en ligne');
  }
}