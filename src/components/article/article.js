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
          <h4>${this.price / 100 * this.qte}€</h4> 
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
        orinoco.pageManager.changePage("produit_" + this._id, "Orinoco - Caméra " + this.name)
    }


}