import './App.css'
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js"
import logo from './assets/LensCure.png'
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { roleRouteMap } from './roleRouteMap'
import { useAuth } from './context/AuthContext.jsx'
import Swal from 'sweetalert2';


function App() {

  const { login } = useAuth()
  const navigate = useNavigate();

  const RBAC = (token) => {
    const decoded = jwtDecode(token);
    //TO DO implement the 404 page
    const route = roleRouteMap[decoded.role] || "/not-authorized";
    navigate(route);
  };

  const handlsubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const payload = {
      email: formData.get('email'),
      password: formData.get('password')
    };

    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Logged in !",
          showConfirmButton: false,
          timer: 1500
        });
        login(data.token)
        localStorage.setItem('token', data.token);
        RBAC(data.token);
      }
    } catch (error) {
      console.log(error + " please try again");
    }
  };

  return (
    <>
      <section className="" style={{ backgroundColor: "#FFFF" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card shadow-lg border-0" style={{ borderRadius: "1rem", overflow: 'hidden' }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src="https://cdn.pixabay.com/photo/2021/08/08/09/52/man-6530416_1280.jpg"
                      alt="login form"
                      className="img-fluid h-100"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center bg-white">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form onSubmit={handlsubmit}>
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <span className="">
                            <img
                              src={logo}
                              alt="Logo"
                              style={{
                                width: "160px",
                                height: "auto",
                                objectFit: "contain"
                              }}
                            />
                          </span>
                        </div>
                        <h5 className="fw-bold mb-4" style={{ letterSpacing: "1px" }}>
                          Sign into your account
                        </h5>
                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control form-control-lg shadow-sm"
                            required
                          />
                          <label className="form-label mt-2" htmlFor="email">
                            Email address
                          </label>
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control form-control-lg shadow-sm"
                            required
                          />
                          <label className="form-label mt-2" htmlFor="password">
                            Password
                          </label>
                        </div>
                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-dark btn-lg btn-block w-100 shadow-sm"
                            type="submit"
                            style={{ borderRadius: "0.5rem" }}
                          >
                            Login
                          </button>
                        </div>
                        <div className="d-flex justify-content-between">
                          <a href="#" className="small text-muted">
                            Terms of use
                          </a>
                          <a href="#" className="small text-muted">
                            Privacy policy
                          </a>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
