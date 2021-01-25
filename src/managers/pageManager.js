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