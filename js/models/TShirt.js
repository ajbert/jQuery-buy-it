import Product from "./Product.js";

// TODO: abandon inheritance
export default class TShirt {
    name = '';
    size = '';
    color = '';

    constructor(props) {

        this.name = props.name ?? '';
        this.size = props.size ?? '';
        this.color = props.color ?? '';
    }
}

