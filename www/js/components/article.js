class Article{

    description;
    imageUrl; 
    lenses;
    name;
    price;
    _id;


    constructor(specs){
        for(const [key, value] of Object.entries(specs)){
            this[key] = value;
        }
    }

    afficheSelect(){
        if (orinoco.productsCamera == this._id) {
        return  `
        <option selected value="${this._id}"> ${this.name}</option>
             `;
        }
        else {
            return  `
        <option value="${this._id}"> ${this.name}</option>
             `; 
        }
        
    }

    afficheResume(){
        return  `
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

    afficheDetails(){
                return  `
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

                 
                <option value="${this.lenses[0]}"> ${this.lenses[0]}</option>
                <option value="${this.lenses[1]}"> ${this.lenses[1]}</option>
                
            </select>
    
    
        <div class="produit_bouton">
        <div class="produit_btn" onclick="orinoco.components.composant_${this._id}.ajoutPanier()">Ajouter au Panier</div>
        </div>
        </div>
             `;
    }

    changePage(){    
      orinoco.storage.addProduit(this._id);
      window.open("produit.html", "_self");
    }

    ajoutPanier(){            
        orinoco.cart.add(this._id);
        orinoco.storage.addPanier(this._id);
      }



}