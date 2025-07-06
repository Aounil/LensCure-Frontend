import React, { useEffect, useState } from 'react'
import { fetchWithAuth } from './fetchWithAuth';
export default function Client() {

    const [products, setProducts] = useState([])

    const getProducts = async () => {
        try {
            const response = await fetchWithAuth('http://localhost:8080/all', {
                method: 'GET',
            });
            const data = await response.json()
            if (response.ok) {
                setProducts(data)
            }
        }
        catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    useEffect( ()=>{
        getProducts();
    } ,[])


    return (
        <div>
            ccc
        </div>
    )
}
