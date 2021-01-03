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
}