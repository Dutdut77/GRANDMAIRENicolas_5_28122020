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
     * @param   {Array}  content  Tableau des produits du panier
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
     * @param   {String}  contenuPanier  Contenu du panier en html.
     * @param   {Number}  total          Prix total du panier
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
     * @param   {string}  id  ID de la caméra
     *
     */
    plus(id) {
        this.products[id].qte++;
        this.updateCount();
    }

    /**
     * Retire une quantité d'un article donné
     *
     * @param   {string}  id  ID de la caméra
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
     * @return  {[void]}  Maj du LocalStorage + Maj du nombre d'article dans le panier + Maj de la page Panier
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
     * @param   {Object}  data  Formulaire + Panier
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