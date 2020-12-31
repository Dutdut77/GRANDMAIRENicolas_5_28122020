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
        return;
    }

    changePage(){
    
        console.log(this);
    }
}