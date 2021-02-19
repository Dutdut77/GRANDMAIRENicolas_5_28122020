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