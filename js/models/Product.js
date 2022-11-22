class Product {
    item = {};
    price = 0;

    constructor(item, price){
        this.item = item ?? {};
        this.price = price ?? 0;
    }

    get formattedPrice(){
        return '$' + this.price.toFixed(2);
    }
}

export default Product;
