class PageManager {

  page;
  domTarget;

  constructor(domTarget) {
    this.domTarget = domTarget;
    this.showPage(window.location.search.slice(1));
    window.onpopstate = ()=>this.showPage(window.location.search.slice(1));

    // if (localStorage.getItem("Panier") == null) {
    //   panier = [];
    // }
    // else {
    //   panier = [localStorage.getItem("Panier")];
    // }




    // var nom_url = window.location.pathname;
    // nom_url = nom_url.split("/");
    // nom_url = nom_url[nom_url.length - 1];

    // if (nom_url == "" || nom_url == "index.html") {
    //   new Home(document.querySelector("div.liste"));
    // }
    // if (nom_url == "produit.html") {
    //   new Select(document.querySelector("select.camera"));

    //   new Prod(document.querySelector("div.produit"));


    //   const elt = document.querySelector("select.camera");   // On récupère l'élément sur lequel on veut détecter le clic    
    //   elt.addEventListener('change', function () {          // On écoute l'événement change
    //     orinoco.productsCamera = event.target.value;         // On ajoute le nouvel id dans la variable.
    //     new Prod(document.querySelector("div.produit"));     //On relanceune instance de Prod.
    //   });


    // }

  }

  showPage(nom_url){
    orinoco.components = {};

/*
    ? > index
    ?produit_xxxxxxx > produit
    ?panier > panier
    ?confirmation
*/
    if (nom_url === "")             return this.page = new Home(this.domTarget);
    // if (nom_url === "panier")       return this.page = new Home(this.domTarget);
    // if (nom_url === "confirmation") return this.page = new Home(this.domTarget);    
    if (nom_url.slice(0,7) === "produit") return this.page = new Produit(this.domTarget, nom_url.slice(8) );
    this.page = new PageError();

  }

  changePage(newPage, title){
      history.pushState({}, title, "?"+newPage);
      this.showPage(newPage);
  }
}