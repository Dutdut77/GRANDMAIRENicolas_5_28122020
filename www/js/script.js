class Cart {

    content = orinoco.dataManager.reloadCart();

    /**
     * Insert le nombre d'article dans le panier
     *
     * @param   {HTMLElement}  domTarget  .shopping_cart
     *
     * @constructor
     */
    constructor(domTarget) {
        this.DOM = document.createElement("cart");
        this.domTarget = domTarget;
        this.render();
    }

    /**
     * Actualise le nombre d'article dans le panier
     *
     * @return  {void}  Nombre d'article dans le panier
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
     * Ajoute un article dans le panier
     *
     * @param   {id}  productId  Id de la caméra ajoutée
     *
     */
    add(productId) {
        this.content.push(productId);
        this.render();
        orinoco.dataManager.saveCart(this.content);
    }


    /**
     * Met à jour le contenu du panier et actualise le rendu
     *
     * @param   {Number}  newCart Nombre d'article dans le panier
     * 
     * @return  {void}
     *
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
     * Transforme le JSON en Tableau
     *
     * @param   {JSON}    specs       JSON de l'API
     * @param   {String}  specs._id   l'id produit
     * @param   {Array}   specs.lens  les variantes du produits
     *
     * @constructor
     */
    constructor(specs) {
        specs.lens
        for (const [key, value] of Object.entries(specs)) {
            this[key] = value;
        }
    }


    /**
     * Affiche les cameras sur la page d'accueil
     *
     * @return  {String}  renvoi le html qui devra être affiché dans le DOM
     */
    afficheResume() {
        return `     
        <div class="card">
            <div class="card__list-image" style="background-image: url('${this.imageUrl}');"></div>
            <div class="card__list-content">
                <div class="card__content-titre">
                    <h1>${this.name}</h1>
                </div>
                <div class="card__content-desc">
                ${this.description}  
                </div>
            </div>
            <div class="card__list_bouton">
                <button class="card__btn btn-grad-color" onclick="orinoco.components.composant_${this._id}.changePage()">Détail</button>
            </div>
        </div>
             `;
    }


    /**
     * Affiche le détail d'une caméra
     *
     * @return  {HTMLElement}  Affiche dans le DOM
     */
    afficheDetails() {

        return `
        <div class="produit">

            <div class="produit-image" style="background-image: url('${this.imageUrl}');"></div>
            
            <div class="produit-content">
                <div class="produit-titre">
                    <h1>${this.name}</h1>
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

            <label for="lenses" class="lenses-label">Choisissez une option :</label>
            <select name="lenses" id="lenses" class="lenses">
                ${this.showVariants(this.lenses)}      
            </select>
            
            <div class="produit-bouton">
                <button class="produit-btn" onclick="orinoco.cart.add('${this._id}')">Ajouter au Panier</button>
            </div>

        </div>
             `;
    }


    /**
     * Affiche le contenu Panier
     *
     * @return  {HTMLElement}  Affiche dans le DOM
     */
    showPanier() {
        return ` <div class="show_panier">                
      <div class="card_panier_img">
              <div class="panier_img" style="background-image: url('${this.imageUrl}');"></div>
      </div>              
          
       <div class="panier_content">
          <div class="panier_content_titre">
              <h2>${this.name}</h2>
          </div>
          <div class="panier_content_quantite">
              <div class="quantite_titre">Quantité :</div>
              <div class="quantite_box"> 
                  <button class="quantite_box_moins" onclick="orinoco.pageManager.page.moins('${this._id}')">-</button>
                  <div class="quantite_box_nombre">${this.qte}</div>
                   <button class="quantite_box_plus" onclick="orinoco.pageManager.page.plus('${this._id}')">+</button>
              </div>    
          </div>   
      </div>
  
      <div class="panier_price">
          <div class="corbeille" onclick="orinoco.pageManager.page.removeProduct('${this._id}')"></div>
          <h2>${this.price / 100 * this.qte}€</h2> 
      </div> 

  </div>
`;
    }

    /**
     * Affiche les OPTIONS du SELECT - Choix de l'objectif
     *
     * @param   {Array}  variants  Tableau contenant la liste des objectifs d'une caméra
     *
     * @return  {HTMLElement}            Affiche dans le DOM
     */
    showVariants(variants) {
        let content = "";
        for (let i = 0, size = variants.length; i < size; i++) {
            content += `<option value="${this.lenses[i]}"> ${this.lenses[i]}</option>`;
        }

        return content;
    }


    /**
     * Fonction pour changer de page vers la page produit
     *
     * @return  {void}  Redirection vers produits.js
     */
    changePage() {
        orinoco.pageManager.changePage("produit_" + this._id, "Orinoco - Caméra " + this.name)
    }
}
/* global Article orinoco*/
class Home {

    /**
     * Insert la page d'accueil 
     *
     * @param   {HTMLElement}  domTarget  Balise main
     *
     * @constructor
     */
    constructor(domTarget) {
        this.getData(domTarget);
    }


    /**
     * Récupère les données et affiche la page home dans le DOM
     *  
     * @param   {HTMLElement}  domTarget  Balise main
     * 
     * @returns {void}             Affiche dans le DOM
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
     * champs à valider
     * @type {Object}
     */
    fields = {}


    /**
     * Insert la page d'accueil 
     *
     * @param   {HTMLElement}  domTarget  Balise main
     *
     * @constructor
     */
    constructor(domTarget) {
        this.getData(domTarget);
        ["nom", "prenom", "adresse", "ville", "email"].forEach(field => this.fields[field] = false);
    }


    /**
     * Récupère le contenu du panier et le met sous forme d'objet
     *  
     * @param   {HTMLElement}  domTarget  Balise main
     * 
     * 
     */
    async getData(domTarget) {
        let content = "";
        let listePanier = [];
        const productId = orinoco.dataManager.reloadCart();
        this.products = await this.cartArrayToCartObject(productId);
        this.render(domTarget);
    }


    /**
     * Affiche la page Panier
     *
     * @param   {HTMLElement}  domTarget  Balise main
     *
     * @return  {void}             Affiche dans le DOM le Panier
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
        if (total === 0) return domTarget.innerHTML = this.templatePanierVide();
        domTarget.innerHTML = this.templatePanier(html, total);
    }

    /**
     * Transforme un array en objet
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
     * Affiche la page panier
     *
     * @param   {HTMLElement}  contenuPanier  Contenu du panier
     * @param   {HTMLElement}  total          Prix total du panier
     *
     *  @return  {String}  renvoi le html qui devra être affiché dans le DOM
     */
    templatePanier(contenuPanier, total) {

        return `
        <div class="panier">

            <div class="card_panier">
                <div class="card_panier_titre">
                    <h1> VOTRE PANIER : </h1>
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
                        <label for="nom">Nom : <span class="error_nom" aria-live="polite"></span></label>
                        <input type="text" name="nom" id="nom" pattern="[A-Z]{2,}" oninput="orinoco.pageManager.page.isValid(this)">
                    </div>
                    <div class="form__group">
                        <label for="prenom">Prénom: <span class="error_prenom" aria-live="polite"></span></label>
                        <input type="text" name="prenom" id="prenom" pattern="[A-Z][a-z]{1,}" oninput="orinoco.pageManager.page.isValid(this)">
                    </div>
                    <div class="form__group">
                        <label for="adresse">Adresse : <span class="error_adresse" aria-live="polite"></span></label>
                        <input type="text" name="adresse" id="adresse" oninput="orinoco.pageManager.page.isValid(this)">
                    </div>
                    <div class="form__group">
                        <label for="ville">Ville :<span class="error_ville" aria-live="polite"></span></label>
                        <input type="text" name="ville" id="ville" oninput="orinoco.pageManager.page.isValid(this)">
                    </div>
                    <div class="form__group">
                        <label for="email">Email :<span class="error_email" aria-live="polite"></span></label>
                        <input type="email" name="email" id="email" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,4}$" oninput="orinoco.pageManager.page.isValid(this)">
                    </div>

                    <div class="form-btn">
                        <button class="valid-btn" type="button" id="valid-btn" onclick="orinoco.pageManager.page.sendForm(event)" disabled value="Valider votre commande">Valider votre commande</button>
                    </div>         
            </div>




        </div>
        
        <div id="myModal" class="modal">
        </div>
                    `;
    }


    /**
     * Affiche la page panier vide
     *
     *
     * @return  {HTMLElement}                 Affiche dans le DOM
     */
    templatePanierVide() {

        return `
        <div class="panier">

            <div class="card_panier">
                    <span class="card_panier-vide"> Votre panier est vide.</span>
                    <div class="card_panier-retour" type="button" onclick="orinoco.pageManager.changePage('', 'Orinoco - Vente de caméras en ligne')">Retour à l'accueil</div>
            </div>

            

         </div>
                        `;
    }

    /**
     * Ajout une quantité d'un article donné
     *
     * @param   {id}  id  ID de la caméra
     *
     */
    plus(id) {
        this.products[id].qte++;
        this.updateCount();
    }

    /**
     * Retire une quantité d'un article donné
     *
     * @param   {id}  id  ID de la caméra
     *
     * 
     */
    moins(id) {
        if (this.products[id].qte === 0) return this.removeProduct(id);
        this.products[id].qte--;
        this.updateCount();
    }

    /**
     * Met à jour le contenu du panier
     *
     * @return  {[type]}  Maj du LocalStorage + Maj du nom d'article dans le panier + Maj de la page Panier
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
     * Supprime un article donné
     *
     * @param   {id}  id  ID de la caméra
     *
     */
    removeProduct(id) {
        delete this.products[id];
        this.updateCount();
    }


    /**
     * Création d'un objet comprenant les données du formulaire + la liste des articles au format souhaité par l'API
     *
     * @param   {Event}  event  formulaire
     *
     * 
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
     * Affiche sous forme de modal le résultat de la requete
     *
     * @param   {Json}  data  Formulaire + Panier
     *
     * @return  {HTMLElement}        Affiche dans le DOM
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
                <button class="modal-btn" type="button" onclick="orinoco.dataManager.deletePanier()">Retour à l'accueil</button>
            </div>
        </div>
        `;
        const domTarget = document.querySelector(".modal");
        domTarget.innerHTML = content;
        this.optionModal();
    }


    /**
     * Permet de rendre visible le modal
     *
     * @return  {[type]}  Affiche le Modal
     */
    optionModal() {
        let modal = document.getElementById("myModal");
        modal.style.display = "block";
    }

    /**
     * Validation du formulaire avant envoi
     *
     * @param   {HTMLElement}  input  Un élément input
     *
     * @return  {[HTMLElement]}         Affichage d'une erreur
     */
    isValid(input) {

        if (input.name == "nom") {
            let error = document.querySelector('.error_nom');

            if (input.value === "") {
                input.className = "";
                this.fields[input.id] = false;
                document.getElementById("valid-btn").disabled = true;
                return error.className = "error_nom empty";

            }

            if (!input.validity.valid) {
                input.className = "";
                this.fields[input.id] = false;
                document.getElementById("valid-btn").disabled = true;
                return error.className = "error_nom badFormatNom";
            }

            error.className = "error_nom";

        }

        if (input.name == "prenom") {
            let error = document.querySelector('.error_prenom');
            if (input.value === "") {
                input.className = "";
                this.fields[input.id] = false;
                document.getElementById("valid-btn").disabled = true;
                return error.className = "error_prenom empty";
            }

            if (!input.validity.valid) {
                input.className = "";
                this.fields[input.id] = false;
                document.getElementById("valid-btn").disabled = true;
                return error.className = "error_prenom badFormatPrenom";
            }

            error.className = "error_prenom";
        }

        if (input.name == "adresse") {
            let error = document.querySelector('.error_adresse');
            if (input.value === "") {
                input.className = "";
                this.fields[input.id] = false;
                document.getElementById("valid-btn").disabled = true;
                return error.className = "error_adresse empty";
            }

            if (!input.validity.valid) {
                input.className = "";
                this.fields[input.id] = false;
                document.getElementById("valid-btn").disabled = true;
                return error.className = "error_adresse badFormat";
            }

            error.className = "error_adresse";
        }

        if (input.name == "ville") {
            let error = document.querySelector('.error_ville');
            if (input.value === "") {
                input.className = "";
                this.fields[input.id] = false;
                document.getElementById("valid-btn").disabled = true;
                return error.className = "error_ville empty";
            }

            if (!input.validity.valid) {
                input.className = "";
                this.fields[input.id] = false;
                document.getElementById("valid-btn").disabled = true;
                return error.className = "error_ville badFormat";
            }

            error.className = "error_ville";
        }

        if (input.name == "email") {
            let error = document.querySelector('.error_email');
            if (input.value === "") {
                input.className = "";
                this.fields[input.id] = false;
                document.getElementById("valid-btn").disabled = true;
                return error.className = "error_email empty";

            }

            if (!input.validity.valid) {
                input.className = "";
                this.fields[input.id] = false;
                document.getElementById("valid-btn").disabled = true;
                return error.className = "error_email badFormat";
            }

            error.className = "error_email";
        }


        input.className = "success";
        this.fields[input.id] = true;

        let validated = 0;
        const size = Object.values(this.fields).length;
        for (const value of Object.values(this.fields)) {
            if (value) validated++;
        }
        if (validated === size) {
            document.getElementById("valid-btn").disabled = false;
        }


    }


}
/* global Article orinoco*/
class Produit {

    /**
     * Récupère le domTarget et l'id de la caméra
     *
     * @param   {HTMLElement}  domTarget  Balise main
     *
     * @constructor
     */
    constructor(domTarget, productId) {

        this.getData(domTarget, productId);

    }

    /**
     * Affiche la page produit
     *
     * @param   {HTMLElement}  domTarget    Balise main
     * @param   {id}  productId             id du produit demmandé
     *
     * @return  {HTMLElement}               Affiche dans le DOM
     */
    async getData(domTarget, productId) {

        const specs = await orinoco.dataManager.getProduct(productId);
        const produit = new Article(specs);
        domTarget.innerHTML = `
        
          <select name="camera" class="camera" id="camera" onchange="orinoco.pageManager.changePage('produit_' + this.value, 'Oricono - Camera '+this.options[this.selectedIndex].text)">        
                ${await this.selectCamera(produit.name)}
          </select>
          ${produit.afficheDetails()}
        `;
    }
  

    /**
     * Donne les options pour le SELECT des caméras
     *
     * @param   {id}  nameSelect           id de la caméra selectionné
     *
     * @return  {String}                   Liste des options en HTML
     */
    async selectCamera(nameSelect) {
        let content = "";
        //let listeName = "";
        const name = await orinoco.dataManager.getAllProducts();
        for (let i = 0, size = name.length; i < size; i++) {
            content += `<option ${nameSelect === name[i].name ? "selected" : ""} value="${name[i]._id}">${name[i].name}</option>`;
        }
        return content;

    }
}
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
   * Récupère tous les données de toutes les cameras
   *
   * @return  {JSON}  JSON de toutes les cameras
   */
  async getAllProducts() {
    const data = await fetch(this.src);
    this.products = await data.json();
    return this.products;

  }

  /**
   * Récupère toutes les données d'une seule caméra
   *
   * @param   {id}  productId  ID d'une caméra
   *
   * @return  {JSON}             JSON des données d'une caméra
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
   * Envoi la validation du panier vers l'API
   *
   * @param   {Array}  user  Tableau comprenant la liste des articles ainsi que les ID des articles commandés
   *
   * @return  {JSON}       Récap de la commande + numéro de commande
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
class PageManager {

  /**
   * la représentation de la page (classe)
   * @type {*}
   */
  page = null;

  /**
   * la représentation du DOM dans la classe
   * @type {HTMLElement|null}
   */
  domTarget = null;


  /**
   * constructor description
   *
   * @param   {HTMLElement}  domTarget  Balise main
   *
   */
  constructor(domTarget) {
    this.domTarget = domTarget;
    this.showPage(window.location.search.slice(1));
    window.onpopstate = () => this.showPage(window.location.search.slice(1));
  }


  /**
   * Affiche la page demandée
   *
   * @param   {String}  nom_url  Nom de la page
   *
   * @return  {void}           Redirection vers la page demandée
   */
  showPage(nom_url) {
    document.getElementById("menuCheck").checked = "none";
    if (nom_url === "") return this.page = new Home(this.domTarget);
    if (nom_url === "panier") return this.page = new Panier(this.domTarget);
    if (nom_url.slice(0, 7) === "produit") return this.page = new Produit(this.domTarget, nom_url.slice(8));
    this.page = new PageError();

  }

  /**
   * Récupère le nom de la page demandée ainsi que son titre
   *
   * @param   {String}  newPage  Nom de la page
   * @param   {String}  title    Titre de la page
   *
   */
  changePage(newPage, title) {
    
    document.title = title;
    history.pushState({}, title, "?" + newPage);
    this.showPage(newPage);

  }
}
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


