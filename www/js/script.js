class Cart {

    content = orinoco.dataManager.reloadCart();

    /**
     * [Insert le nombre d'article dans le panier]
     *
     * @param   {[HTMLElement]}  domTarget  [cible]
     *
     */
    constructor(domTarget) {
        this.DOM = document.createElement("cart");
        this.domTarget = domTarget;
        this.render();
    }

    /**
     * [Actualise le nombre d'article dans le panier]
     *
     * @return  {[number]}  [Nombre d'article dans le panier]
     */
    render() {

        if (this.content.length > 0) {
            if (!this.domTarget.hasChildNodes()) this.domTarget.appendChild(this.DOM);
            this.DOM.innerText = this.content.length;
            return;
        }
        if (this.domTarget.hasChildNodes()) this.domTarget.removeChild(this.DOM);
    }


    /**
     * [Ajoute un article dans le panier]
     *
     * @param   {[id]}  productId  [Id de la caméra ajoutée]
     *
     * @return  {[type]}             [Nouveau rendu + actualisation du LocalStorage]
     */
    add(productId) {
        this.content.push(productId);
        this.render();
        orinoco.dataManager.saveCart(this.content);
    }


    /**
     * [updateFromPagePanier description]
     *
     * @param   {[type]}  newCart  [newCart description]
     *
     * @return  {[type]}           [return description]
     */
    updateFromPagePanier(newCart) {
        this.content = newCart;
        this.render();
    }

}
class Article {

    description;
    imageUrl;
    lenses;
    name;
    price;
    _id;

    /**
     * [Transforme le JSON en Tableau]
     *
     * @param   {[JSON]}  specs  [JSON de l'API]
     *
     * @return  {[Array]}         [JSON transformer en ARRAY]
     */
    constructor(specs) {
        for (const [key, value] of Object.entries(specs)) {
            this[key] = value;
        }
    }


    /**
     * [Affiche les cameras sur la page d'accueil]
     *
     * @return  {[HTML]}  [Affiche dans le DOM]
     */
    afficheResume() {
        return `
        <div class="card">
            <div class="card__list-image" style="background-image: url('${this.imageUrl}');"></div>
            <div class="card__list-content">
                <div class="card__content-titre">
                    <h3>${this.name}</h3>
                </div>
                <div class="card__content-desc">
                ${this.description}  
                </div>
            </div>
            <div class="card__list_bouton">
                <div class="card__btn btn-grad-color" onclick="orinoco.components.composant_${this._id}.changePage()">Détail</div>
            </div>
        </div>
             `;
    }


    /**
     * [Affiche le détail d'une caméra]
     *
     * @return  {[HTML]}  [Affiche dans le DOM]
     */
    afficheDetails() {

        return `
        <div class="produit">

            <div class="produit-image" style="background-image: url('${this.imageUrl}');"></div>
            
            <div class="produit-content">
                <div class="produit-titre">
                    <h3>${this.name}</h3>
                </div>
                <div class="produit-prix">
                     ${this.price / 100} € 
                </div>  
            </div>
 
            <div class="produit-desc">
                <article>
                ${this.description}
                </article>             
            </div>     
            
            <select name="lenses" class="lenses">
                <option value="">Choisissez une option :</option>
                ${this.showVariants(this.lenses)}      
            </select>
            
            <div class="produit-bouton">
                <div class="produit-btn" onclick="orinoco.cart.add('${this._id}')">Ajouter au Panier</div>
            </div>

        </div>
             `;
    }


    /**
     * [Affiche le contenu Panier]
     *
     * @return  {[HTML]}  [Affiche dans le DOM]
     */
    showPanier() {
        return ` <div class="show_panier">                
      <div class="card_panier_img">
              <div class="panier_img" style="background-image: url('${this.imageUrl}');"></div>
      </div>              
          
       <div class="panier_content">
          <div class="panier_content_titre">
              <h4>${this.name}</h4>
          </div>
          <div class="panier_content_quantite">
              <div class="quantite_titre">Quantité :</div>
              <div class="quantite_box"> 
                  <div class="quantite_box_moins" onclick="orinoco.pageManager.page.moins('${this._id}')"></div>
                  <div class="quantite_box_nombre">${this.qte}</div>
                   <div class="quantite_box_plus" onclick="orinoco.pageManager.page.plus('${this._id}')"></div>
              </div>    
          </div>   
      </div>
  
      <div class="panier_price">
          <div class="corbeille" onclick="orinoco.pageManager.page.removeProduct('${this._id}')"></div>
          <h4>${this.price / 100 * this.qte}€</h4> 
      </div> 

  </div>
`;
    }

    /**
     * [Affiche les OPTIONS du SELECT - Choix de l'objectif]
     *
     * @param   {[Array]}  variants  [Tableau contenant la liste des objectifs d'une caméra]
     *
     * @return  {[HTML]}            [Affiche dans le DOM]
     */
    showVariants(variants) {
        let content = "";
        for (let i = 0, size = variants.length; i < size; i++) {
            content += `<option value="${this.lenses[i]}"> ${this.lenses[i]}</option>`;
        }

        return content;
    }

    
    /**
     * [Fonction pour changer de page vers la page produit]
     *
     * @return  {[HTML]}  [Redirection vers produits.js]
     */
    changePage() {
        orinoco.pageManager.changePage("produit_" + this._id, "Orinoco - Caméra " + this.name)
    }


}
class Home {

    /**
     * Insert la page d'accueil 
     *
     * @param   {HTMLElement}  domTarget  [domTarget description]
     *
     * @constructor
     */
    constructor(domTarget) {
        this.getData(domTarget);
    }


    /**
     * Récupère les données et affiche la page home dans le DOM
     *  
     * @param   {HTMLElement}  domTarget  [domTarget description]
     * 
     * @returns {void}                     affiche dans le DOM
     */
    async getData(domTarget) {
        let content = "";

        const products = await orinoco.dataManager.getAllProducts();
        for (let i = 0, size = products.length; i < size; i++) {
            orinoco.components["composant_" + products[i]._id] = new Article(products[i]);
            content += orinoco.components["composant_" + products[i]._id].afficheResume();
        }
        domTarget.innerHTML = content;
    }
}


class Panier {

    /**
     * Insert la page d'accueil 
     *
     * @param   {HTMLElement}  domTarget  [domTarget description]
     *
     * @constructor
     */
    constructor(domTarget) {
        this.getData(domTarget);
    }


    /**
     * Récupère les données et affiche la page home dans le DOM
     *  
     * @param   {HTMLElement}  domTarget  [domTarget description]
     * 
     * @returns {void}                     affiche dans le DOM
     */
    async getData(domTarget) {
        let content = "";
        let listePanier = [];
        const productId = orinoco.dataManager.reloadCart();
        this.products = await this.cartArrayToCartObject(productId);
        this.render(domTarget);
    }


    /**
     * [render description]
     *
     * @param   {HTMLElement}  domTarget  [domTarget description]
     *
     * @return  {void}             [Affiche dans le DOM le Panier]
     */
    render(domTarget) {
        let html = "";
        let total = 0;
        let produit;
        for (const value of Object.values(this.products)) {
            produit = new Article(value);
            html += produit.showPanier();
            total += value.qte * value.price / 100;
        }
        domTarget.innerHTML = this.templatePanier(html, total);
    }

    /**
     * [CartArrayToCartObject description]
     *
     * @param   {Array}  content  la liste des produits
     *
     * @return  {Object}           la liste factorisée en objets
     */
    async cartArrayToCartObject(content) {
        const retour = {};
        for (let i = 0, size = content.length; i < size; i++) {
            if (retour[content[i]] === undefined) {
                retour[content[i]] = {
                    ...await orinoco.dataManager.getProduct(content[i]),
                    qte: 1
                };
                continue;
            }
            retour[content[i]].qte++;
        }
        return retour;
    }


    /**
     * [Affiche la page panier]
     *
     * @param   {[HTMLElement]}  contenuPanier  [Contenu du Panier]
     * @param   {[HTMLElement]}  total          [Le Total]
     *
     * @return  {[void]}                 [Affiche dans le DOM]
     */
    templatePanier(contenuPanier, total) {

        return `
        <div class="panier">

            <div class="card_panier">
                <div class="card_panier_titre">
                    <h1> MON PANIER : </h1>
                </div>           
                     ${contenuPanier}
                <div class="card_panier_total">
                    <h2> TOTAL : </h2>
                    <div class="total_price">
                        ${total} €
                    </div>
                </div>
            </div>

            <div class="contact">
                    <h2> Vos coordonnées :</h2>               
                    <div class="form__group">
                        <label for="nom">Nom : </label>
                        <input type="text" name="nom" id="nom">
                    </div>
                    <div class="form__group">
                        <label for="prenom">Prénom: </label>
                        <input type="text" name="prenom" id="prenom">
                    </div>
                    <div class="form__group">
                        <label for="adresse">Adresse : </label>
                        <input type="text" name="adresse" id="adresse">
                    </div>
                    <div class="form__group">
                        <label for="ville">Ville :</label>
                        <input type="text" name="ville" id="ville">
                    </div>
                    <div class="form__group">
                        <label for="email">Email :</label>
                        <input type="email" name="email" id="email">
                    </div>

                    <div class="form-btn">
                        <div class="valid-btn" type="button" onclick="orinoco.pageManager.page.sendForm(event)">Valider votre commande</div>
                    </div>         
            </div>

        </div>
        
        <div id="myModal" class="modal">
        </div>
                    `;
    }

    /**
     * [Ajout une quantité d'un article donné]
     *
     * @param   {id}  id  [ID de la caméra]
     *
     */
    plus(id) {
        this.products[id].qte++;
        this.updateCount();
    }

    /**
     * [Retire une quantité d'un article donné]
     *
     * @param   {id}  id  [ID de la caméra]
     *
     */
    moins(id) {
        if (this.products[id].qte === 0) return this.removeProduct(id);
        this.products[id].qte--;
        this.updateCount();
    }

    /**
     * [Met à jour le contenu du panier]
     *
     * @return  {[type]}  [Maj du LocalStorage + Maj du nom d'article dans le panier + Maj de la page Panier]
     */
    updateCount() {
        const newCart = [];
        for (const [key, value] of Object.entries(this.products)) {
            for (let i = value.qte; i > 0; i--) {
                newCart.push(key);
            }
        }
        orinoco.dataManager.saveCart(newCart);
        orinoco.pageManager.showPage("panier");
        orinoco.cart.updateFromPagePanier(newCart);
    }


    /**
     * [Supprime un article donné]
     *
     * @param   {id}  id  [ID de la caméra]
     *
     */
    removeProduct(id) {
        delete this.products[id];
        this.updateCount();
    }


    /**
     * [Création d'un objet comprenant les données du formulaire + la liste des articles au format souhaité par l'API]
     *
     * @param   {Event}  event  [event description]
     *
     * @return  {[type]}         [Affiche dans le DOM un modal du resultat de l'envoi]
     */
    async sendForm(e) {
        e.stopPropagation();
        e.preventDefault();
        const nom = document.getElementById("nom").value;
        const prenom = document.getElementById("prenom").value;
        const adresse = document.getElementById("adresse").value;
        const ville = document.getElementById("ville").value;
        const email = document.getElementById("email").value;
        const product = [];
        for (const [key, value] of Object.entries(this.products)) {
            for (let i = value.qte; i > 0; i--) {
                product.push(value._id);
            }
        }
        const contact = {
            "contact": {
                "lastName": nom,
                "firstName": prenom,
                "address": adresse,
                "city": ville,
                "email": email,
            },
            "products": product
        }

        const result = await orinoco.dataManager.postPanier(contact);
        this.afficheModal(result);

    }

    /**
     * [Affiche sous forme de modal le résultat de la requete]
     *
     * @param   {[Json]}  data  [Formulaire + Panier]
     *
     * @return  {[type]}        [Affiche dans le DOM]
     */
    async afficheModal(data) {
        let recap = "";
        let liste = [];
        let recapTotal = 0;
        const prod = data.products;
        for (let i = 0, size = prod.length; i < size; i++) {
            liste.push(prod[i]._id);
        }
        const validPanier = await this.cartArrayToCartObject(liste);
        for (const value of Object.values(validPanier)) {
            recapTotal += value.price * value.qte / 100;
            recap += `
            <div class="recap">
                <div class="recap-titre">${value.name}</div>
                <div class="recap-qte">Quantité : ${value.qte}</div>
                <div class="recap-price">${(value.price) / 100 * value.qte} €</div>                       
            </div>
            `;
        }
        const content = `
        <div class="modal-content">
            
            <div class="modal-header">
                <h2>Commande validée.</h2>
                <p>N° ${data.orderId}</p>        
            </div>

            <div class="modal-body">
                <hr>
                <div class="modal-section">
                    <div class="modal-section-titre">Récapitulatif :</div>
                    ${recap}
                    <hr>
                    <div class="modal-total">            
                        Montant total : ${recapTotal} €
                    </div>
                </div>
                <hr>
                <div class="modal-section">
                    <div class="modal-section-titre">Adresse de Livraison :</div>            
                    <p>${data.contact.lastName} ${data.contact.firstName}</p>  
                    <p>${data.contact.address} </p>
                    <p>${data.contact.city} </p>
                </div>                
                <hr>
                <div class="modal-facture">
                    <p><h3>Orinoco</h3> vous remercie pour votre commande. Une facture vous sera envoyée sur votre addresse mail : <p class="mail">${data.contact.email}</p></p>           
                </div>
            </div>

            <div class="modal-footer">  
                <div class="modal-btn" type="button" onclick="orinoco.dataManager.deletePanier()">Retour à l'accueil</div>
            </div>
        </div>
        `;
        const domTarget = document.querySelector(".modal");
        domTarget.innerHTML = content;
        this.optionModal();
    }


    /**
     * [Permet de rendre visible le modal]
     *
     * @return  {[type]}  [Affiche le Modal]
     */
    optionModal() {
        let modal = document.getElementById("myModal");
        modal.style.display = "block";
    }




}


















class Produit {

    /**
     * Récupère le domTarget et l'id de la caméra
     *
     * @param   {HTMLElement}  domTarget  [Target de la page produit]
     *
     * @constructor
     */
    constructor(domTarget, productId) {

        this.getData(domTarget, productId);

    }

    /**
     * [Affiche la page produit]
     *
     * @param   {HTMLElement}  domTarget  [Target de la page produit]
     * @param   {id}  productId  [id du produit demmandé]
     *
     * @return  {[type]}             [Affiche dans le DOM]
     */
    async getData(domTarget, productId) {

        const specs = await orinoco.dataManager.getProduct(productId);
        const produit = new Article(specs);
        domTarget.innerHTML = `
          <select name="camera" class="camera" onchange="orinoco.pageManager.changePage('produit_' + this.value, 'Oricono - Camera '+this.options[this.selectedIndex].text)">        
              ${await this.selectCamera(produit.name)}
          </select>
          ${produit.afficheDetails()}
        `;
    }


    /**
     * [Donne les options pour le SELECT des caméras]
     *
     * @param   {[id]}  nameSelect  [id de la caméra selectionné]
     *
     * @return  {[HTML]}              [Liste des options]
     */
    async selectCamera(nameSelect) {
        let content = "";
        let listeName = "";
        const name = await orinoco.dataManager.getAllProducts();
        for (let i = 0, size = name.length; i < size; i++) {
            content += `<option ${nameSelect === name[i].name ? "selected" : ""} value="${name[i]._id}">${name[i].name}</option>`
        }
        return content;

    }
}
class DataManager {

  products = null;
  src;


  /**
   * [Récupère le lien de l'API]
   *
   * @param   {[link]}  src  [Lien de l'API]
   *
   */
  constructor(src) {
    this.src = src;
  }

  /**
   * [Récupère tous les données de toutes les cameras]
   *
   * @return  {[JSON]}  [JSON de toutes les cameras]
   */
  async getAllProducts() {
    const data = await fetch(this.src);
    this.products = await data.json();
    return this.products;

  }

  /**
   * [Récupère toutes les données d'une seule caméra]
   *
   * @param   {[id]}  productId  [ID d'une caméra]
   *
   * @return  {[JSON]}             [JSON des données d'une caméra]
   */
  async getProduct(productId) {
    if (this.products !== null) return this.findInProducts(productId);
    const data = await fetch(this.src + "/" + productId);
    return await data.json();

  }

  /**
   * [Envoi la validation du panier à l'API]
   *
   * @param   {[Array]}  user  [Tableau comprenant la liste des articles ainsi que les ID des articles commandés]
   *
   * @return  {[JSON]}        [Récap de la commande + numéro de commande]
   */
  async postPanier(user) {
    const contact = JSON.stringify(user);
    const option = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: contact
    }

    const data = await fetch("http://localhost:3000/api/cameras/order", option);
    return await data.json();
  }



  /**
   * [findInProducts description]
   *
   * @param   {[type]}  productId  [productId description]
   *
   * @return  {[type]}             [return description]
   */
  findInProducts(productId) {
    for (let i = 0, size = this.products.length; i < size; i++) {
      if (this.products[i]._id === productId) return this.products[i];
    }
    throw ("can't find product");
  }



  /**
   * [Sauvegarde le panier dans le localStorage]
   *
   * @param   {[Array]}  cartContent  [Array comprenant les ID des cameras commandées]
   *
   */
  saveCart(cartContent) {
    localStorage.setItem("cart", JSON.stringify(cartContent));
  }

  /**
   * [Charge le panier à partir du localStorage]
   *
   * @return  {[JSON]}  [Contenu du panier en JSON]
   */
  reloadCart() {
    const content = localStorage.getItem("cart");
    if (content === null) return [];
    return JSON.parse(content);
  }

  /**
   * [Vide le localStorage (Panier)]
   *
   * @return  {[type]}  [Cart localStorage vide + redirection page d'accueil]
   */
  deletePanier() {
    localStorage.clear(Cart);
    orinoco.cart.content = [];
    orinoco.cart.render();
    orinoco.pageManager.changePage('');
  }
}
class PageManager {

  page;
  domTarget;
  /**
   * [constructor description]
   *
   * @param   {[HTMLElement]}  domTarget  [domTarget description]
   *
   */
  constructor(domTarget) {
    this.domTarget = domTarget;
    this.showPage(window.location.search.slice(1));
    window.onpopstate = () => this.showPage(window.location.search.slice(1));

  }


  /**
   * [Affiche la page demandée]
   *
   * @param   {[URL]}  nom_url  [Nom de la page]
   *
   * @return  {[HTML]}           [Redirection vers la page demandée]
   */
  showPage(nom_url) {

    if (nom_url === "") return this.page = new Home(this.domTarget);
    if (nom_url === "panier") return this.page = new Panier(this.domTarget);
    if (nom_url.slice(0, 7) === "produit") return this.page = new Produit(this.domTarget, nom_url.slice(8));
    this.page = new PageError();

  }

  /**
   * [Récupère le nom de la page demandée ainsi que son titre]
   *
   * @param   {[Text]}  newPage  [Nom de la page]
   * @param   {[Text]}  title    [Titre de la page]
   *
   * @return  {[type]}           [REnvoi vers showPage pour affiche la page]
   */
  changePage(newPage, title) {
    document.getElementById("menuCheck").checked = "none";
    document.title = title;
    history.pushState({}, title, "?" + newPage);
    this.showPage(newPage);

  }
}
/**
 * [Récupère les données de l'API]
 *
 * @param   {[URL]}  http://localhost:3000/api/cameras  [Lien de l'API]
 *
 * @return  {[JSON]}                                     [Retourne la liste des cameras vendu sur le site]
 */
const orinoco = {
    dataManager: new DataManager("http://localhost:3000/api/cameras"),
    components: {}

}

orinoco.cart = new Cart(document.querySelector(".shopping_cart")),
orinoco.pageManager = new PageManager(document.querySelector("main"));


