import axios from 'axios';
import React, { Component } from 'react';
import posed from 'react-pose';
import ProductConsumer from '../context';
const Animation = posed.div({
    visible: {
        opacity: 1,
        applyAtStart: {
            display: "block",

        }
    },
    hidden: {
        opacity: 0,
        applyAtStart: {
            display: "none"
        }
    }
});
export default class AddProduct extends Component {
    state = {
        visiblity: true,
        name: "",
        price: "",
        image: "",
        value: "",
        error: false
    }
    changeVisiblity = (e) => {
        this.setState({
            visiblity: !this.state.visiblity
        })
    }
    changeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    validateForm = () => {
        const { name,
            price,
            image,
            value } = this.state;
        if (name == "" || price == "" || image == "" || value == "") {
            return false;
        }
        return true;
    }
    addProduct = async (dispatch, e) => {
        e.preventDefault();
        const { name,
            price,
            image,
            value } = this.state;
        const newProduct = {
            name,
            price,
            image,
            value
        }
        if (!this.validateForm()) {
            this.setState({
                error: true
            })
            return;
        }
        const response = await axios.post("http://localhost:3001/shopData", newProduct)
        dispatch({ type: "ADD_PRODUCT", payload: response.data })
        this.props.history.push("/")
    }
    render() {
        const { visiblity, name,
            price,
            image, error } = this.state;
        return (
            <ProductConsumer>
                {
                    value => {
                        const { dispatch } = value;
                        return (
                            <div className='container col-md-8 mb-5'>
                                <button onClick={this.changeVisiblity} className='btn btn-dark btn-block col-12 mb-5'>{visiblity ? "Hide form" : "Show form"}</button>

                                <Animation pose={visiblity ? "visible" : "hidden"}>
                                    <div className='card bg-dark text-white'>
                                        <div className='card-header'>
                                            <h3>Add Product Form</h3>
                                        </div>
                                        <div className='card-body'>
                                            <form onSubmit={this.addProduct.bind(this, dispatch)}>
                                                {
                                                    error ?
                                                        <div className='elert alert-danger px-3 py-3'>
                                                            full your empty block(s)
                                                        </div>
                                                        : null
                                                }
                                                <div className='form-group mb-3'>

                                                    <label htmlFor='name'>Name:</label>
                                                    <input
                                                        type="text"
                                                        name='name'
                                                        placeholder='Enter Name'
                                                        id='id'
                                                        className='form-control rounded-pill bg-white'
                                                        value={name}
                                                        onChange={this.changeInput}
                                                    />
                                                </div>
                                                <div className='form-group mb-3'>
                                                    <label htmlFor='price'>Price:</label>
                                                    <input
                                                        type="text"
                                                        name='price'
                                                        placeholder='Enter price'
                                                        id='price'
                                                        className='form-control rounded-pill bg-white'
                                                        value={price}
                                                        onChange={this.changeInput}
                                                    />
                                                </div>
                                                <div className='form-group mb-3'>
                                                    <label htmlFor='image'>Image:</label>
                                                    <input
                                                        type="text"
                                                        name='image'
                                                        placeholder='Enter image'
                                                        id='image'
                                                        className='form-control rounded-pill bg-white'
                                                        value={image}
                                                        onChange={this.changeInput}
                                                    />
                                                </div>
                                                <div className='form-group mb-3'>
                                                    <label htmlFor='image'>Category:</label>
                                                    <input
                                                        type="text"
                                                        name='value'
                                                        placeholder='Enter category'
                                                        id='value'
                                                        className='form-control rounded-pill bg-white'
                                                        value={this.state.value}
                                                        onChange={this.changeInput}
                                                    />
                                                </div>
                                                <div className='d-flex justify-content-end'>
                                                    <button onSubmit={this.addProduct} className='btn btn-primary rounded-pill w-50' type="submit">Add Product</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </Animation>
                            </div>
                        )
                    }
                }
            </ProductConsumer>
        )

    }
}
