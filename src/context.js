import axios from 'axios';
import React, { Component } from 'react'

//Provider and Consumer
const ProductContext = React.createContext();
const reducer = (state, action) => {
    if (action.type == "DELETE_PRODUCT") {
        return {
            ...state,
            products: state.products.filter(product => action.payload !== product.id)
        }
    } else if (action.type == "ADD_PRODUCT") {
        return {
            ...state,
            products: [...state.products, action.payload]
        }
    } else if (action.type == "UPDATE_PRODUCT") {
        return {
            ...state,
            products: state.products.map(product => (
                product.id === action.payload.id ? action.payload : product
            ))
        }
    }
    else {
        return state;
    }
}
export class ProductProvider extends Component {
    state = {
        products: [
        ],
        dispatch: action => {
            this.setState(state => reducer(state, action))
        }
    }
    componentDidMount = async () => {
        const response = await axios.get("http://localhost:3001/shopData")
        this.setState({
            products: response.data
        })
    }
    render() {
        return (
            <ProductContext.Provider value={this.state}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}
const ProductConsumer = ProductContext.Consumer;

export default ProductConsumer;