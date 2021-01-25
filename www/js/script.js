class Article {

    description;
    imageUrl;
    lenses;
    name;
    price;
    _id;


    constructor(specs) {
        for (const [key, value] of Object.entries(specs)) {
            this[key] = value;
        }
    }



    afficheResume() {
        return `
        <div class="card">
            <div class="list_image" style="background-image: url('${this.imageUrl}');"></div>
            <div class="list_content">
                <div class="content_titre">
                    <h3>${this.name}</h3>
                </div>
                <div class="content_desc">
                ${this.description}  
                </div>
            </div>
            <div class="list_bouton">
                <div class="btn" onclick="orinoco.components.composant_${this._id}.changePage()">Détail</div>
            </div>
        </div>
             `;
    }

    afficheDetails() {

        return `
        <div class="card-produit">

            <div class="produit_image" style="background-image: url('${this.imageUrl}');"></div>
            
            <div class="produit_content">
                <div class="produit_titre">
                    <h3>${this.name}</h3>
                </div>
                <div class="produit_prix">
                     ${this.price} € 
                </div>  
            </div>
 
            <div class="produit_desc">
                <article>
                ${this.description}
                </article>             
            </div>     
            
            <select name="lenses" class="lenses">
                <option value="">Choisissez une option :</option>
                ${this.showVariants(this.lenses)}      
            </select>
            
            <div class="produit_bouton">
                <div class="produit_btn" onclick="orinoco.cart.add('${this._id}')">Ajouter au Panier</div>
            </div>

        </div>
             `;
    }

    showPanier(){
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
          <h4>${this.price * this.qte}€</h4> 
      </div> 

  </div>
`; 
    }


    showVariants(variants) {
        let content = "";
        for (let i = 0, size = variants.length; i < size; i++) {
            content += `<option value="${this.lenses[i]}"> ${this.lenses[i]}</option>`;
        }

        return content;
    }


    changePage() {
        orinoco.pageManager.changePage("produit_" + this._id, "Page produit " + this.name)
    }


}
class Cart {

    content = orinoco.dataManager.reloadCart();

    constructor(domTarget) {

        this.DOM = document.createElement("cart");
        this.domTarget = domTarget;
        this.render();
    }

    render() {

        if (this.content.length > 0) {
            if (!this.domTarget.hasChildNodes()) this.domTarget.appendChild(this.DOM);
            this.DOM.innerText = this.content.length;
            return;
        }
        if (this.domTarget.hasChildNodes()) this.domTarget.removeChild(this.DOM);
    }

    add(productId) {
        this.content.push(productId);
        this.render();
        orinoco.dataManager.saveCart(this.content);
    }



    updateFromPagePanier(newCart){
      this.content = newCart;
      this.render();
    }

}
class Home {

    /**
     * insert la page d'accueil 
     *
     * @param   {HTMLElement}  domTarget  [domTarget description]
     *
     * @constructor
     */
    constructor(domTarget) {
        this.getData(domTarget);
    }


    /**
     * recupère les données et affiche la page home dans le DOM
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
     * insert la page d'accueil 
     *
     * @param   {HTMLElement}  domTarget  [domTarget description]
     *
     * @constructor
     */
    constructor(domTarget) {
        this.getData(domTarget);
    }


    /**
     * recupère les données et affiche la page home dans le DOM
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


    render(domTarget) {
        let html = "";
        let total = 0;
        let produit;
        for (const value of Object.values(this.products)) {
            produit = new Article(value);
            html += produit.showPanier();
            total += value.qte * value.price;
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

    templatePanier(contenuPanier, total) {

        return `
        <div class="card_panier">
            <div class="card_panier_titre">
                <h1> MON PANIER : </h1>
            </div>
        
            ${contenuPanier}
            <div class="card_panier_total">
                <h2> TOTAL :  </h2>
                <div class="total_price">
                    ${total}
                </div>
            </div>
            <div class="contact">
                <h2> Vos coordonnées :  </h2>

               
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

    plus(id) {
        this.products[id].qte++;
        this.updateCount();
    }

    moins(id) {
        if (this.products[id].qte === 0) return this.removeProduct(id);
        this.products[id].qte--;
        this.updateCount();
    }

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

    removeProduct(id) {
        delete this.products[id];
        this.updateCount();
    }

    
    /**
     * [sendForm description]
     *
     * @param   {Event}  event  [event description]
     *
     * @return  {[type]}         [return description]
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


    async afficheModal(data) {
        let recap = "";
        let liste =[];
        let recapTotal= 0;
        const prod = data.products;
        for (let i = 0, size = prod.length; i < size; i++) {
        liste.push(prod[i]._id);        
        }
        const validPanier = await this.cartArrayToCartObject(liste);
        for (const value of Object.values(validPanier)) {
            recapTotal +=value.price * value.qte;
            recap += `<div class="recap">
            <div class="recap-titre">${value.name}</div>
            <div class="recap-qte">Quantité : ${value.qte}</div>
            <div class="recap-price">${value.price * value.qte} €</div>                       
            </div>`;
        }



        
          
      
        const content = `
        <!-- Modal content -->
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

    optionModal() {

        let modal = document.getElementById("myModal");

        modal.style.display = "block";

    }

    


}


















class Produit {

    /**
     * insert la page d'accueil 
     *
     * @param   {HTMLElement}  domTarget  [domTarget description]
     *
     * @constructor
     */


    constructor(domTarget, productId) {

        this.getData(domTarget, productId);

    }


    async getData(domTarget, productId) {

        const specs = await orinoco.dataManager.getProduct(productId);
        const produit = new Article(specs);
        domTarget.innerHTML = `
          <select name="camera" class="camera" onchange="orinoco.pageManager.changePage('produit_' + this.value, 'Camera '+this.options[this.selectedIndex].text)">        
              ${await this.selectCamera(produit.name)}
          </select>
          ${produit.afficheDetails()}
        `;
    }



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

  constructor(src) {
    this.src = src;
  }

  async getAllProducts() {
    const data = await fetch(this.src);
    this.products = await data.json();
    return this.products;

  }

  async getProduct(productId) {
    if (this.products !== null) return this.findInProducts(productId);
    const data = await fetch(this.src + "/" + productId);
    return await data.json();

  }


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

  findInProducts(productId) {
    for (let i = 0, size = this.products.length; i < size; i++) {
      if (this.products[i]._id === productId) return this.products[i];
    }
    throw ("can't find product");
  }

  saveCart(cartContent) {
    localStorage.setItem("cart", JSON.stringify(cartContent));
  }

  reloadCart() {
    const content = localStorage.getItem("cart");
    if (content === null) return [];
    return JSON.parse(content);
  }
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

  constructor(domTarget) {
    this.domTarget = domTarget;
    this.showPage(window.location.search.slice(1));
    window.onpopstate = () => this.showPage(window.location.search.slice(1));

  }

  showPage(nom_url) {
   //orinoco.components = {};
  

    if (nom_url === "")                             return this.page = new Home(this.domTarget);
    if (nom_url === "panier")                       return this.page = new Panier(this.domTarget);
    if (nom_url.slice(0, 7) === "produit")          return this.page = new Produit(this.domTarget, nom_url.slice(8));
    this.page = new PageError();

  }

  changePage(newPage, title) {
    document.title = title;
    history.pushState({}, title, "?" + newPage);
    this.showPage(newPage);
    
  }
}
const orinoco = {
    dataManager: new DataManager("http://localhost:3000/api/cameras"),
    components: {}
   
}

orinoco.cart = new Cart(document.querySelector(".shopping_cart")),
orinoco.pageManager = new PageManager(document.querySelector("main"));


