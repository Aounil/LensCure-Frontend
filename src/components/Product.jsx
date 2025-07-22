import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';





export default function Product() {

    // this 'Location' takes the state passed in the State in <Link/> 
    const location = useLocation();
    const { product } = location.state || {};
    const { addToCart } = useCart()
    const navigate = useNavigate();

    const handleAddToCart = (product) => {
        addToCart(product)

        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: "success",
            title: `"${product.name}" added to cart!`
        });
    }

    if (!product) {
        navigate('/');
        return null;
    }

    return (
        <div className='container mt-5'>
            <div className="row">
                <div className='col-lg-6 col-sm-12'>
                    <img
                        src={product.image_path}
                        alt={product.name}
                        className="img-fluid rounded shadow-sm mb-4"
                        style={{ maxHeight: '400px', objectFit: 'cover' }}
                    />

                </div>

                <div className='col-lg-6 col-sm-12'>
                    <h1 className="fw-bold">{product.name}</h1>
                    <h3 className="text-success mt-3">${product.price}</h3>
                    <p className="text-muted fs-4 mt-4">{product.description}</p>
                    <p className="text-secondary">Reference: <strong>{product.reference}</strong></p>


                    <button className='btn btn-dark mt-5' onClick={(e) => handleAddToCart(product)}>Add to Cart</button>

                </div>

            </div>
        </div>
    )
}
