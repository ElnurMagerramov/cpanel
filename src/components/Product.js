import React, { Component } from 'react'
import ProductConsumer from '../context';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FaPen } from 'react-icons/fa';
import swal from 'sweetalert';
class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            deleteModal: true
        }
    }
    visibility = (e) => {
        this.setState({
            isVisible: !this.state.isVisible
        })
    }
    toggleDeleteModal = (e) => {
        this.setState({
            deleteModal: !this.state.deleteModal
        })
    }
    onDeleteProduct = async (dispatch, e) => {
        const { id } = this.props;
        axios.delete(`http://localhost:3001/shopData/${id}`)
        dispatch({ type: "DELETE_PRODUCT", payload: id })
        swal("Good job!", "You delete product!", "success");
        this.toggleDeleteModal();
    }
    onUndeleteProduct=()=>{
        this.toggleDeleteModal();
        swal("Operation was cancelled!", "Product was not deleted!", "warning");
    }
    render() {
        const { id, name, price, image } = this.props;
        const { isVisible, deleteModal } = this.state;
        return (
            <ProductConsumer>
                {
                    value => {
                        const { dispatch } = value
                        return (
                            <div className='col-3'>
                                <div
                                    className={"position-fixed top-0 d-flex align-items-center justify-content-center " + (deleteModal ? " d-none" : null)}
                                    style={{
                                        zIndex: "2",
                                        width: "100%",
                                        height: "100%",
                                        left: "0",
                                    }}
                                >
                                    <div className='position-absolute top-0'
                                        style={{
                                            width: "100%",
                                        height: "100%",
                                        left: "0",
                                        backgroundColor:"black",
                                        opacity:"0.5",
                                        zIndex:"3"
                                        }}
                                    ></div>
                                    <div className='bg-white p-3 rounded' style={{zIndex:"4"}}>
                                        <p>Do you want to delete?</p>
                                        <button className='bg-primary text-white btn me-2' onClick={this.onUndeleteProduct.bind()}>NO</button>
                                        <button className='bg-danger text-white btn' onClick={this.onDeleteProduct.bind(this, dispatch)}>Yes</button>
                                    </div>
                                </div>
                                <div className={`card mb-3 ${isVisible ? "bg-white" : null}`}>
                                    <div className="card-header d-flex justify-content-between align-items-center" onClick={this.visibility}>
                                        <h3 className=''>{name}</h3>
                                        <p className="d-flex gap-2  align-items-center">
                                            <span onClick={this.toggleDeleteModal.bind()}
                                                style={{ "cursor": "pointer" }}
                                            ><FontAwesomeIcon icon={faTrash} />
                                            </span>
                                            <Link to={`edit/${id}`} className="text-dark">
                                                <FaPen />
                                            </Link>
                                        </p>
                                    </div>
                                    {
                                        isVisible ?
                                            <div className="card-body">
                                                <img
                                                    src={image}
                                                    className="card-img-top"
                                                    style={{ height: "300px" }}
                                                    alt="card_image"
                                                />
                                                <div className="card-text text-dark d-flex justify-content-between">
                                                    <p className="card-text">${price}</p>
                                                    <p>{this.props.value}</p>
                                                </div>
                                            </div> : null
                                    }
                                </div>
                            </div>
                        )
                    }
                }
            </ProductConsumer>
        )

    }
}
export default Product;
