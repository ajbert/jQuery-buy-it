import Cart from "../models/Cart.js";
import ComponentFactory from "./ComponentFactory.js";



class StorePage {

    cart;
    productsSelector;
    wishList;

    constructor(cart, productsSelector, wishList) {
        this.cart = cart ?? new Cart();
        this.productsSelector = productsSelector ?? '';
        this.wishList = wishList ?? new Cart();
    }
    // this method is a little smelly:
    // https://refactoring.guru/smells/long-method
    // TODO: refactor 💩
    outputProducts(products) {
        let $container = $('<div class="row row-cols-1 row-cols-lg-3">');
        let componentFactory = new ComponentFactory();


        // loop through products, creating the cards and buttons
        products.forEach(product => {
            let $card = componentFactory.createCard(
                product.item.name,
                product.formattedPrice,
                `${product.item.size ? '<b>Size:</b> ' + product.item.size + '<br>': ''}
                                ${product.item.color ? '<b>Color:</b> ' + product.item.color + '<br>' : ''}
                                ${product.item.style ? '<b>Style:</b> ' + product.item.style + '<br>' : ''}
                                ${product.item.height ? '<b>Height:</b> ' + product.item.height + '<br>' : ''}
                                ${product.item.gender ? '<b>Gender:</b> ' + product.item.gender + '<br>' : ''}
                                ${product.item.material ? '<b>Gender:</b> ' + product.item.material + '<br>' : ''}
                                ${product.item.floats ? '<b>Gender:</b> ' + product.item.floats + '<br>' : ''}`,
                `<button class="add-to-cart btn btn-lg btn-primary w-100">BUY IT NOW!</button>
                            <button class="add-to-wishlist btn btn-sm btn-outline-secondary w-100 mt-2">Buy It Later</button>`
            );


            // add click event to the button
            $card.find('.add-to-cart').on('click', () => {this.addToCart(product)});
            $card.find('.add-to-wishlist').on('click', () => {this.addToWishList(product)});

            // add the card to the container
            $container.append($card)
        });

        // output the container to the page
        $(this.productsSelector).html($container);

    }
    addToWishList(product){
        this.wishList.addItem(product);
        this.outputWishList();
    }

    removeFromWishList(cartItem){
        // TODO: switch to command pattern
        this.wishList.removeItem(cartItem);
        this.outputWishList();
    }

    outputWishList(){
        if(!this.wishList.items.length){
            $('#wishlist').html('<p class="text-center my-5">Add some stuff to buy later!</p>');
            // 👆💩???

            return;
        }

        let $table = $(`
            <table class="table m-0">
                <thead></thead>
                <tbody></tbody>
                <tfoot class="table-group-divider"></tfoot>
            </table>
        `);

        // loop through products, creating the cards and buttons
        this.wishList.items.forEach(cartItem => {
            let $tr = $(`
                <tr>
                    <td>
                        <h5>${cartItem.product.item.name}</h5>
                        <h6 class="text-muted">${cartItem.product.formattedPrice} &times; ${cartItem.quantity}</h6>
                    </td>
                    <td class="text-end">
                        ${cartItem.formattedSubtotal}<br>
                        <button class="remove-btn btn btn-link text-danger">Remove</button>
                    </td>
                </tr>`
            );
            // add click event to the button
            $tr.find('.remove-btn').on('click', (e) => {this.removeFromWishList(cartItem)});

            // add the card to the container
            $table.find('tbody').append($tr);
        });

        $table.find('tfoot').append(`
            <tr>
                <th class="border-0">Total:</th>
                <th class="border-0 text-end">${this.wishList.formattedTotal}</th>
            </tr>
        `)

        // output the container to the page
        $('#wishlist').html($table);
        // 👆💩???
    }

    addToCart(product){
        this.cart.addItem(product);
        this.outputCart();
    }

    removeCartItem(cartItem){
        // TODO: switch to command pattern
        this.cart.removeItem(cartItem);
        this.outputCart();
    }

    outputCart(){
        if(!this.cart.items.length){
            $('#cart').html('<p class="text-center my-5">Why is your cart empty?</p>');
            // 👆💩???

            return;
        }

        let $table = $(`
            <table class="table m-0">
                <thead></thead>
                <tbody></tbody>
                <tfoot class="table-group-divider"></tfoot>
            </table>
        `);

        // loop through products, creating the cards and buttons
        this.cart.items.forEach(cartItem => {
            let $tr = $(`
                <tr>
                    <td>
                        <h5>${cartItem.product.name}</h5>
                        <h6 class="text-muted">${cartItem.product.formattedPrice} &times; ${cartItem.quantity}</h6>
                    </td>
                    <td class="text-end">
                        ${cartItem.formattedSubtotal}<br>
                        <button class="remove-btn btn btn-link text-danger">Remove</button>
                    </td>
                </tr>`
            );

            // add click event to the button
            $tr.find('.remove-btn').on('click', (e) => {this.removeCartItem(cartItem)});

            // add the card to the container
            $table.find('tbody').append($tr);
        });

        $table.find('tfoot').append(`
            <tr>
                <th class="border-0">Total:</th>
                <th class="border-0 text-end">${this.cart.formattedTotal}</th>
            </tr>
        `)

        // output the container to the page
        $('#cart').html($table);
        // 👆💩???
    }
}

export default StorePage;
