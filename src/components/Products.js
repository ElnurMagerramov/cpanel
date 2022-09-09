import React, { Component } from 'react'
import ProductConsumer from '../context';
import Product from './Product';
class Products extends Component {
    render() {
        return(<ProductConsumer>
            {
                value =>{
                    const {products} = value;
                    return (
                        <div className='row'>
                            {
                                products.map(product => {
                                    return(
                                        <Product
                                            key = {product.id}
                                            id = {product.id}
                                            name = {product.name}
                                            price = {product.price}
                                            image = {product.image}
                                            value={product.value}
                                        />
                                    )
                                })
                            }
                        </div>
                    )
                }
            }
        </ProductConsumer>
        )
    }
}
export default Products;