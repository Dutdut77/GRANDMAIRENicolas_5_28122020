class PageManager {

  /**
   * la représentation de la page (classe)
   * @type {*}
   */
  page = null;

  /**
   * la représentation du DOM dans la classe
   * @type {HTMLElement|null}
   */
  domTarget = null;


  /**
   * constructor description
   *
   * @param   {HTMLElement}  domTarget  Balise main
   *
   */
  constructor(domTarget) {
    this.domTarget = domTarget;
    this.showPage(window.location.search.slice(1));
    window.onpopstate = () => this.showPage(window.location.search.slice(1));
  }


  /**
   * Affiche la page demandée
   *
   * @param   {URL}  nom_url  Nom de la page
   *
   * @return  {HTML}           Redirection vers la page demandée
   */
  showPage(nom_url) {

    if (nom_url === "") return this.page = new Home(this.domTarget);
    if (nom_url === "panier") return this.page = new Panier(this.domTarget);
    if (nom_url.slice(0, 7) === "produit") return this.page = new Produit(this.domTarget, nom_url.slice(8));
    this.page = new PageError();

  }

  /**
   * Récupère le nom de la page demandée ainsi que son titre
   *
   * @param   {Text}  newPage  Nom de la page
   * @param   {Text}  title    Titre de la page
   *
   */
  changePage(newPage, title) {
    document.getElementById("menuCheck").checked = "none";
    document.title = title;
    history.pushState({}, title, "?" + newPage);
    this.showPage(newPage);

  }
}