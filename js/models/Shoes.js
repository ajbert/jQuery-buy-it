import Product from "./Product.js";

// TODO: abandon inheritance
export default class Shoes {
    name = '';
    size = '';
    style = '';

    constructor(props) {

        this.name = props.name ?? '';
        this.size = props.size ?? '';
        this.style = props.style ?? '';
    }
}
