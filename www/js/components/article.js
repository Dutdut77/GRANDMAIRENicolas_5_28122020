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
        <select name="camera" class="camera">
        ${this.selectCamera(this._id)}
        </select>
 
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

    showVariants(variants) {
        let content = "";
        for (let i = 0, size = variants.length; i < size; i++) {
            content += `<option value="${this.lenses[i]}"> ${this.lenses[i]}</option>`;
        }
        return content;
    }

    selectCamera(productId) {        
    //orinoco.select.getData(productId);
    }


    changePage() {
        orinoco.pageManager.changePage("produit_" + this._id)
    }


}