import React, { useState } from 'react';
import { fetchWithAuth } from '../fetchWithAuth';
import { toast, Bounce } from 'react-toastify';


export default function UserCreation() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'CLIENT',
    });
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const response = await fetchWithAuth('http://localhost:8080/admin/register',
                { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) })

            if (response.ok) {
                toast.success('👤 User created successfully!', {
                    position: 'top-right',
                    autoClose: 2800,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                    transition: Bounce,
                    style: {
                        background: 'linear-gradient(135deg, #2ecc71, #27ae60)',
                        color: '#ffffff',
                        fontWeight: '600',
                        fontSize: '1rem',
                        borderRadius: '10px',
                        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.25)',
                        letterSpacing: '0.3px',
                        padding: '12px 18px'
                    },
                    icon: '✅'
                });
                setLoading(false)

            }

        } catch (error) {
            console.error('Error updating role:', error);
            toast.error('Error updating role');

        }
    };

    const handleReset = () => {
        setFormData({
            name: '',
            email: '',
            password: '',
            role: 'CLIENT'
        });
    };

    return (
        <div className="container w-75 p-5">
            <h2 className="mb-4">Admin Panel - Create Users:</h2>
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <div className="form-group mb-3">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group mb-4">
                    <label htmlFor="role">Role</label>
                    <select
                        id="role"
                        className="form-control"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                    >
                        <option value="CLIENT">CLIENT</option>
                        <option value="ADMIN">ADMIN</option>
                        <option value="GESTIONNAIRE_ACHAT">GESTIONNAIRE_ACHAT</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-success me-3">{loading?"Saving....":"Save"}{loading && <div className="spinner-border spinner-border-sm ms-2" role="status" />}
                </button>
                <button type="reset" className="btn btn-danger">Clear</button>

            </form>
        </div>
    );
}


