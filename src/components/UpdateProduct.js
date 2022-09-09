import axios from 'axios';
import React, { Component } from 'react';
import ProductConsumer from '../context';

export default class UpadateProduct extends Component {
    state = {
        name: "",
        price: "",
        image: "",
        value: "",
        error: false
    }

    changeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    validateForm = () => {
        const { name, price, image, value } = this.state;
        if (name == "" || price == "" || image == "" || value == "") {
            return false;
        }
        return true;
    }
    upadateProduct = async (dispatch, e) => {
        e.preventDefault();
        const { name, price, image, value } = this.state;
        const { id } = this.props.match.params;
        this.upadateProduct = {
            name, price, image, value
        }
        if (!this.validateForm()) {
            this.setState({
                error: true
            })
            return;
        }
        const response = await axios.put(`http://localhost:3001/shopData/${id}`, this.upadateProduct);
        this.props.history.push("/");
        dispatch({
            type: "UPDATE_PRODUCT",
            payload: response.data
        }
        )

    }
    componentDidMount = async () => {
        const { id } = this.props.match.params;
        const response = await axios.get(`http://localhost:3001/shopData/${id}`);
        const { name, price, image, value } = response.data;
        this.setState({
            name,
            price,
            image,
            value
        })
    }
    render() {
        const { name, price, image, error } = this.state;
        return (
            <ProductConsumer>
                {
                    value => {
                        const { dispatch } = value;
                        return (
                            <div className='container col-md-8 mb-5'>
                                <div className='card bg-dark text-white'>
                                    <div className='card-header'>
                                        <h3>Update Product Form</h3>
                                    </div>
                                    <div className='card-body'>
                                        {
                                            error ?
                                                <div className='elert alert-danger px-3 py-3'>
                                                    full your empty block(s)
                                                </div>
                                                : null
                                        }
                                        <form onSubmit={this.upadateProduct.bind(this, dispatch)}>
                                            <div className='form-group mb-3'>
                                                <label htmlFor='name'>Name:</label>
                                                <input
                                                    type="text"
                                                    name='name'
                                                    placeholder='Enter Name'
                                                    id='id'
                                                    className='form-control rounded-pill'
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
                                                    className='form-control rounded-pill'
                                                    value={price}
                                                    onChange={this.changeInput}
                                                />
                                            </div>
                                            <div className='form-group mb-3'>
                                                <label htmlFor='price'>Category:</label>
                                                <input
                                                    type="text"
                                                    name='value'
                                                    placeholder='Enter category'
                                                    id='value'
                                                    className='form-control rounded-pill'
                                                    value={this.state.value}
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
                                                    className='form-control rounded-pill'
                                                    value={image}
                                                    onChange={this.changeInput}
                                                />
                                            </div>
                                            <div className='d-flex justify-content-end'>
                                                <button onSubmit={this.upadateProduct} className='btn btn-success rounded-pill w-50' type="submit">Update Product</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>


                            </div>
                        )
                    }
                }
            </ProductConsumer>
        )

    }
}
