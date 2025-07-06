import React from 'react'

export default function StockManager() {
  return (
    <div>
      <h1>STOCK</h1>
    </div>
  )
}






// import React, { useEffect, useState } from 'react'
// import { fetchWithAuth } from './fetchWithAuth';

// export default function Client() {
//   const [products, setProducts] = useState([])
//   const [search, setSearch] = useState("");
//   const [filterStatus, setFilterStatus] = useState("ALL");

//   const getProducts = async () => {
//     try {
//       const response = await fetchWithAuth('http://localhost:8080/all', {
//         method: 'GET',
//       });
//       const data = await response.json()
//       if (response.ok) {
//         setProducts(data)
//       }
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   }

//   useEffect(() => {
//     getProducts();
//   }, [])

//   const filteredProducts = products.filter(product => {
//     const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
//     const matchesStatus = filterStatus === "ALL" || product.status === filterStatus;
//     return matchesSearch && matchesStatus;
//   });

//   return (
//     <div className="container py-5">
//       <h1 className="mb-4 text-center fw-bold">Available Products</h1>

//       {/* Search and Filter Controls */}
//       <div className="row mb-4">
//         <div className="col-md-6 mb-2">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Search by name..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>
//         <div className="col-md-6 mb-2">
//           <select
//             className="form-select"
//             value={filterStatus}
//             onChange={(e) => setFilterStatus(e.target.value)}
//           >
//             <option value="ALL">All Statuses</option>
//             <option value="AVAILABLE">Available</option>
//             <option value="OUT_OF_STOCK">Out of Stock</option>
//           </select>
//         </div>
//       </div>

//       {filteredProducts.length === 0 ? (
//         <p className="text-center">No products found.</p>
//       ) : (
//         <div className="row g-4">
//           {filteredProducts.map(product => (
//             <div className="col-md-6 col-lg-4" key={product.id}>
//               <div className="card h-100 shadow-lg border-0 rounded-4">
//                 <img
//                   src={product.image_path}
//                   className="card-img-top rounded-top-4"
//                   alt={product.name}
//                   style={{ height: '200px', objectFit: 'contain', padding: '10px' }}
//                 />
//                 <div className="card-body d-flex flex-column">
//                   <h5 className="card-title fw-bold text-primary">{product.name}</h5>
//                   <p className="card-text text-muted" style={{ minHeight: '60px' }}>{product.description}</p>
//                   <div className="mt-auto">
//                     <p className="mb-1"><strong>Price:</strong> ${product.price}</p>
//                     <p className="mb-1"><strong>Status:</strong> <span className={product.status === 'AVAILABLE' ? 'text-success' : 'text-danger'}>{product.status}</span></p>
//                     <p className="mb-3"><strong>Stock:</strong> {product.quantity}</p>
//                     <button className="btn btn-dark w-100">View Details</button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }