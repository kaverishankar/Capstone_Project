import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {jwtDecode} from "jwt-decode";
import logo from './logo.png';
import { Link } from 'react-router-dom';
import './layout.css';
import { handledAPIPost } from '../apis/auth';

const Footer = () => { 
    return (
        <div className="d-flex row mb-4">
            <div className="col-md-6 justify-content-center">
                <div className="form-check mb-3 mb-md-0">
                    <a href="#!">Forgot password?</a>
                </div>
            </div>
            <div className="col-md-6 justify-content-center">
                <p>Not a member? <Link to="/register">Register</Link></p>
            </div>
        </div>
    );
};

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await handledAPIPost("/login", { email, password });
            const { message, userToken } = response;
            localStorage.setItem("authToken", userToken);
            dispatch({
                type: "account_authenticated",
                userInfo: jwtDecode(userToken),
            });
            alert(message || "Login successful");
            navigate("/");
        } catch (err) {
            alert(err.message);
        }
    };
    return (
        <div className="container login-container">
            <div style={{ textAlign: 'center' }}>
                <img style={{ height: '100px', width: '130px' }} src={logo} alt="Logo" />
                <h1 style={{ fontFamily: 'Righteous', color: 'red' }}>Real Estate</h1>
            </div>

            <div className="tab-content">
                <div className="tab-pane fade show active" id="pills-buyer-login" role="tabpanel" aria-labelledby="tab-login">
                    <form onSubmit={handleSubmit}>
                        <div className='border border-danger rounded p-3 m-2'>
                            <div className="form-outline mb-2 text-danger">
                                <label htmlFor="email">Email address :</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    required
                                />
                            </div>
                            <div className="form-outline mb-2 text-danger">
                                <label htmlFor="password">Password :</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary btn-block w-100 mb-2">Sign in</button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default LoginPage;
