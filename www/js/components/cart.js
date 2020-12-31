class Cart{

    content=[];
 
    constructor(domTarget){
        
        this.DOM = document.createElement("cart");   
        this.domTarget=domTarget;
        this.render();
    }

    render(){  
        
        if (this.content.length > 0) {
               this.domTarget.appendChild(this.DOM);
               this.DOM.innerText = this.content.length;  
        }
            
    }

    add(productId){
        this.content.push(productId);
        this.render();
    }
}