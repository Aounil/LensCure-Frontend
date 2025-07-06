import NVlogo from './assets/NVlogo.png'
import './Navbar.css'
import userIcon from './assets/usericon.svg'
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx'

export default function Navbar() {
    const { user, logout, isAuthenticated } = useAuth(); // Get user and auth status from context
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const handleViewProfile = () => {
        // Add your profile navigation logic here
        // on going
    };

    // If not authenticated, show simple navbar
    if (!isAuthenticated) {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ position: 'sticky', top: 0, zIndex: 1030 }}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="#"><img src={NVlogo} alt="Logo" style={{ width: "40px", height: "auto", objectFit: "contain" }} /></a>
                    <div className="navbar-nav mx-auto">
                        <span className="nav-link welcome">Welcome to LensCure</span>
                    </div>
                </div>
            </nav>
        );
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ position: 'sticky', top: 0, zIndex: 1030 }}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="#"><img src={NVlogo} alt="Logo" style={{ width: "40px", height: "auto", objectFit: "contain" }} /></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item">
                                <a className="nav-link active welcome" aria-current="page" href="#">Welcome to LensCure</a>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle d-flex align-items-center" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src={userIcon} alt="" className="me-2" style={{ width: '20px', height: '20px' }} />
                                    <span className="user-name">{user?.name}</span>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                                    <li><a className="dropdown-item" href="#" onClick={handleViewProfile}>View Profile</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#" onClick={handleLogout}>Log Out</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}