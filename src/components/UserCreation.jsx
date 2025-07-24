import React, { useState } from 'react';
import { fetchWithAuth } from '../fetchWithAuth';
import { toast, Bounce } from 'react-toastify';
import Beams from './Beams';
import Silk from './Silk';



export default function UserCreation() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'CLIENT',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetchWithAuth('http://localhost:8080/admin/register',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

            if (response.ok) {
                toast.success('👤 User created successfully!', {
                    position: 'top-right',
                    autoClose: 2800,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
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
                handleReset();
            } else {
                toast.error('Error creating user', { theme: 'colored' });
            }
        } catch (error) {
            console.error('Error creating user:', error);
            toast.error('Error creating user', { theme: 'colored' });
        } finally {
            setLoading(false);
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

        <div className="container-sm d-flex justify-content-center align-items-center min-vh-100">
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
                <Silk color="#7edef9" speed={3} scale={1.2} noiseIntensity={1.0} rotation={0.2} />
            </div>
            <div className="card shadow p-4 w-100" style={{ maxWidth: '500px' }}>
                <h3 className="mb-4 text-center fw-bold">Admin Panel - Create User</h3>
                <form onSubmit={handleSubmit} onReset={handleReset}>
                    {/* Name */}
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label fw-semibold">Name</label>
                        <input
                            type="text"
                            id="name"
                            className="form-control"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Full name"
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-semibold">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="example@domain.com"
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label fw-semibold">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="Minimum 6 characters"
                        />
                    </div>

                    {/* Role */}
                    <div className="mb-4">
                        <label htmlFor="role" className="form-label fw-semibold">Role</label>
                        <select
                            id="role"
                            className="form-select"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                        >
                            <option value="CLIENT">Client</option>
                            <option value="ADMIN">Admin</option>
                            <option value="GESTIONNAIRE_ACHAT">Gestionnaire Achat</option>
                        </select>
                    </div>

                    <div className="d-flex gap-2">
                        <button
                            type="submit"
                            className="btn btn-success w-50 fw-semibold"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    Saving...
                                    <span className="spinner-border spinner-border-sm ms-2"></span>
                                </>
                            ) : (
                                'Save User'
                            )}
                        </button>
                        <button type="reset" className="btn btn-outline-danger w-50 fw-semibold">Clear</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
