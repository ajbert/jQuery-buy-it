

export default class ProductFactory{

    createProduct(products, types, productList){
      products.forEach(item => productList.addItem(new Product((item), item.price)));
      return productList;
}
}