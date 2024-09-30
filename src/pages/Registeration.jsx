import { useState } from "react";
import { Link } from "react-router-dom";
import logo from './logo.png'; 
import './layout.css'; 
import { handledAPIPost } from "../apis/auth.js";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    userType: "buyer", 
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await handledAPIPost("/register", formData);
      alert(response.message || "");
    } catch (err) {
      alert(err.message);
    }

  setFormData({
    name: "",
    phone: "",
    email: "",
    address: "",
    userType: "buyer", 
    password: "",
  });
  };

  return (
    <div className="container register-container mt-3 pb-5">
      <div style={{ textAlign: 'center' }}>
        <img style={{ height: '80px', width: '120px' }} src={logo} alt="Logo" />
        <h2 style={{ fontFamily: 'Righteous', color: 'red' }}>Real Estate</h2>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <form className="border border-danger rounded p-4" onSubmit={handleSubmit}>
            <h2 className="mb-4 text-center">Register</h2>
            <div className="form-group text-danger">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your Name"
              />
            </div>
            <div className="form-group text-danger">
              <label htmlFor="phone">Mobile number *</label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                pattern="[0-9]{10}"
                maxLength="10"
                placeholder="Enter your mobile number"
              />
            </div>
            <div className="form-group text-danger">
              <label htmlFor="email">Email address *</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </div>
            <div className="form-group text-danger">
              <label htmlFor="address">Address *</label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="Enter your Address"
              />
            </div>
            <div className="form-group text-danger">
              <label htmlFor="userType">I am a *</label>
              <select
                className="form-control"
                id="userType"
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                required
              >
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
              </select>
            </div>
            <div className="form-group text-danger">
              <label htmlFor="password">Password *</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary btn-block">
                Register
              </button>
            </div>
            <p className="mt-3 text-center">
              Already have an account? <Link to="/login">Login here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
