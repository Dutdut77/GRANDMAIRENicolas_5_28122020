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
            ${this.selectCamera('select.camera', this.name)}
          
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


    affichePanier() {

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


    showVariants(variants) {
        let content = "";
        for (let i = 0, size = variants.length; i < size; i++) {
            content += `<option value="${this.lenses[i]}"> ${this.lenses[i]}</option>`;
        }

        return content;
    }

    async selectCamera(domTarget, nameSelect) {
        let content = "";
        let listeName = "";
        const name = await orinoco.dataManager.getAllProducts();
        for (let i = 0, size = name.length; i < size; i++) {
            listeName = new Article(name[i]);
            if (nameSelect === listeName.name) {
                content += "<option selected value=" + listeName._id + "> " + listeName.name + "</option>";

            }
            else {
                content += "<option value=" + listeName._id + "> " + listeName.name + "</option>";

            }


        }

        //console.log(content); 
        document.querySelector(domTarget).innerHTML = content; // Pourquoi je ne peux pas mettre domTarget query selector dans une variable ????
        // return content;       Pourquoi un simple return content ne fonctionne pas. Comme par exemple la fonction showVariants. ????????

        document.querySelector(domTarget).addEventListener('change', (event) => {
            orinoco.pageManager.changePage("produit_" + event.target.value);
        });

    }






    /**
        aaselectCamera() {
            let selectName = "";
                   fetch(orinoco.dataManager.src)
                .then((res) => res.json())
                .then((data) => {
                    for (let i = 0, size = data.length; i < size; i++) {
                        selectName += "<option value=" + data[i].name + "> " + data[i].name + "</option>";
    
                    }
                    
                    //return selectName;
    
                });
    
            console.log(selectName);
    
    
        }
     */


    changePage() {
        orinoco.pageManager.changePage("produit_" + this._id)
    }


}