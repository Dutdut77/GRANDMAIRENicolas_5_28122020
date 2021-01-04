class DataManager {

    products = null;
    src;

    constructor(src) {
        this.src = src;
    }

    async getAllProducts() {
        const data = await fetch(this.src);
        this.products = await data.json();
        return this.products;
    }

    async getProduct(productId){
      console.log(this.products);
        if (this.products !== null) return this.findInProducts(productId);
        const data = await fetch(this.src+"/"+productId);
        return await data.json();

    }

    findInProducts(productId){
      for(let i=0, size = this.products.length; i<size; i++){
        if (this.products[i]._id === productId) return this.products[i];
      }
      throw("can't find product");
    }

    saveCart(cartContent){
      localStorage.setItem("cart", JSON.stringify(cartContent));
    }

    reloadCart(){
      const content = localStorage.getItem("cart");
      if (content === null) return [];
      return JSON.parse(content);
    }
}