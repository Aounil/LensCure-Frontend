import React, { useEffect, useState } from 'react'
import { useAuth } from './context/AuthContext'
import { fetchWithAuth } from './fetchWithAuth'
import { motion } from 'framer-motion' 
import './Orders.css'

export default function Orders() {

  const { user } = useAuth();
  const [orderItems, setOrderItems] = useState([])

  const getOrders = async () => {
    if (user) {
      const response = await fetchWithAuth(
        `http://localhost:8080/orders?email=${encodeURIComponent(user.sub)}`,
        { method: 'GET' }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setOrderItems(data);
      }
    }
  }

  useEffect(() => {
    getOrders();
  }, [user])

  return (
    <div className="container my-5">
      <h2 className="mb-4">Your Orders, {user?.name}:</h2>

      <div className="row gy-4">
        {orderItems.map((product, index) => (
          <motion.div
            key={index}
            className="col-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="card shadow-sm p-3 d-flex flex-row align-items-center">
              <img
                src={product.image_path}
                alt={product.name}
                className="img-fluid rounded"
                style={{ maxWidth: '120px', maxHeight: '120px', objectFit: 'cover' }}
              />
              <div className="ms-4 flex-grow-1">
                <h5 className="mb-1">{product.name}</h5>
                <p className="mb-1 text-muted">${product.price}</p>
                <p className="mb-0">Quantity: {product.quantity}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
