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
                        <div class="valid-btn" onclick="orinoco.pageManager.page.sendForm(event)">Valider votre commande</div>
                    </div>

               

            </div>
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
    sendForm(e) {
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
                product.push(value);
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

        orinoco.dataManager.postPanier(contact);

    }
}
