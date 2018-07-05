import React ,{Component} from 'react';


class ProductCondensed extends Component{
    constructor(props){
        super(props);
        this.removeProduct = this.removeProduct.bind(this);
    }
    removerProduct = ()=>
//    Render is particular to Component
    render(){
        return(
            <div>
                <li className='list-group-item pc-condensed'>
                    <a className='btn btn-outline-danger' onClick={()=>this.removeProduct()}>X</a>
                    <p>{this.props.product.title} | <b>{this.props.product.price} </b> </p>
                </li>
            </div>
        );
    }
}

export default ProductCondensed;