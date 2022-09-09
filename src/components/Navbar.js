import { faNavicon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
function Navbar(props) {
    const [state, setState]=useState(false)
    const toggleNavbar=()=>{
        setState(!state)
    }
    return (
        <div>
            <nav className="bg-dark text-white position-fixed pe-5"
            style={{
                zIndex: "1",
                height:"100%",
                transitionDuration:"2s",
                left:(
                    state?"-16%":"0%"
                )
            }}
            >
                <button
                onClick={toggleNavbar}
                className='btn bg-dark text-white position-relative'
                style={{
                    zIndex: "1",
                    right:"-115%"
                }}
                >
                {
                    <FontAwesomeIcon icon={faNavicon}/>
                }
                </button>
                <ul type="none">
                    <li><a className="navbar-brand" href="index.html">
                        <h2><span className='fw-bold'>COZA</span> STORE</h2>
                        </a></li>
                    <li className="nav-item">
                        <Link className='navbar-brand text-white' to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className='navbar-brand text-white' to="/products">Products</Link>
                    </li>
                    <li className="nav-item">
                        <Link className='navbar-brand text-white' to="/add">Add Product</Link>
                    </li>
                </ul>
            </nav>
            
        </div>

    )
}
export default Navbar;