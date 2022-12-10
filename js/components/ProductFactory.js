import Hat from "../models/Hat";
import Product from "../models/Product";
import Pants from "../models/Pants";
import Socks from "../models/Socks";
import Shoes from "../models/Shoes";
import TShirt from "../models/TShirt";
import products from "../data/products";

export default class ProductFactory{

    createProduct(product, productList){
          return product.forEach(product => productList.addItem(product));

}
}