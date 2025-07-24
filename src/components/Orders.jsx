import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchWithAuth } from '../fetchWithAuth';
import { motion } from 'framer-motion';
import Silk from './Silk';
import '../styles/Orders.css';

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    if (user) {
      const response = await fetchWithAuth(
        `http://localhost:8080/orders?email=${encodeURIComponent(user.sub)}`,
        { method: 'GET' }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setOrders(data); // now data is a list of orders
      }
    }
  };

  function getStatusClass(status) {
    switch (status) {
      case 'Pending':
        return 'badge bg-warning text-dark';
      case 'Shipped':
        return 'badge bg-primary';
      case 'Delivered':
        return 'badge bg-success';
      case 'Cancelled':
        return 'badge bg-danger';
      default:
        return 'badge bg-secondary';
    }
  }

  function getStatusEmoji(status) {
    switch (status) {
      case 'Pending':
        return '⏳';
      case 'Shipped':
        return '📦';
      case 'Delivered':
        return '🚚';
      case 'Cancelled':
        return '❌';
      default:
        return 'ℹ️';
    }
  }


  useEffect(() => {
    getOrders();
  }, [user]);

  return (
    <div className="container my-5">
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
        }}
      >
        <Silk
          speed={5}
          scale={1}
          color="#7B7481"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>

      <h2 className="mb-4 text-light">Your Orders, {user?.name}:</h2>

      {orders.length === 0 && <p>You have no orders yet.</p>}

      <div className="row gy-4">
        {orders.map((order, orderIndex) => (
          <div key={order.orderId} className="col-12 mb-4 orderCard">

            <h4 className="text-light order-header">
              <span className="order-id">Order #{order.orderId} -</span>
              <span className={getStatusClass(order.orderStatus || 'UNKNOWN')}>
                {getStatusEmoji(order.orderStatus || 'UNKNOWN')} {order.orderStatus || 'Unknown'}
              </span>
            </h4>


            <p className='text text-light'>
              Placed on: {new Date(order.orderDate).toLocaleString()}
            </p>

            {order.items.map((item, index) => (
              <motion.div
                key={item.id}
                className="card shadow-sm p-3 d-flex flex-row align-items-center mb-2"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <img
                  src={item.imagePath}
                  alt={item.name}
                  className="img-fluid rounded"
                  style={{
                    maxWidth: '120px',
                    maxHeight: '120px',
                    objectFit: 'cover',
                  }}
                />
                <div className="ms-4 flex-grow-1">
                  <h5 className="mb-1">{item.name}</h5>
                  <p className="mb-1 text-muted">${item.price.toFixed(2)}</p>
                  <p className="mb-0">Quantity: {item.quantity}</p>
                </div>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
