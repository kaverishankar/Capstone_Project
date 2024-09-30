import './layout.css';
import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from './Logo.png';
import { useSelector, useDispatch } from 'react-redux';

const CartLink = () => {
    const { products } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.account);

    if (userInfo.userType === "seller") {
        return "";
    }
    return (
        <Link to='/cart' className='btn btn-outline-light bg-primary mr-5 d-flex align-items-center' style={{ marginRight: '10px' }}>
            {'Cart'}<i style={{ padding: '5px' }} className="fa-solid fa-cart-shopping"></i>{products.length}
        </Link>
    )
};


const LayoutPage = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: "account_logout" });
        navigate("/login");
    };

    return (
        <div className="layout">
            <header className="header fixed top-0">
                <nav className="navbar navbar-expand-sm m-5">
                    <img style={{ height: '100px', width: '120px' }} src={logo} alt="Logo" />
                    <Link to="/">
                    <h2 style={{ fontFamily: 'Righteous', color: 'rgb(48, 48, 47)' }}>Real Estate</h2>
                    </Link>
                    <div className="container-fluid p-5">
                        <div className='search'>
                            <div className="search-wrapper">
                                <input className="form-control search-input" type="search" placeholder="Search..." aria-label="Search" />
                                <button className="btn search-button" type="submit">
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div style={{ float: 'right', marginLeft: '210px', display: 'flex' }}>
                        <CartLink />
                        <button className="btn btn-outline-danger mr-2 d-flex align-items-center" onClick={handleLogout}>

                            {'Logout'}<i style={{ paddingLeft: '10px' }} className="fa-solid fa-arrow-right-from-bracket"></i>
                        </button>
                    </div>
                </nav>
            </header>

            <div className='main-content'>
                <Outlet />
            </div>
            <footer className="footer fixed bottom-0">
                <div style={{ float: 'left', paddingLeft: '30px', paddingTop: '10px', margin: '3px', fontSize: '2px' }}>
                    <h6>Contact : +91 123456789</h6>
                    <h6>Email : realestate@gmail.com</h6>
                </div>
                <div style={{ float: 'right', paddingLeft: '1100px', fontSize: '20px', color: 'rgb(7, 28, 222)' }}>
                    <i style={{ padding: '10px' }} className="fa-brands fa-facebook"></i>
                    <i style={{ padding: '10px' }} className="fa-brands fa-twitter"></i>
                    <i style={{ padding: '10px' }} className="fa-brands fa-instagram"></i>
                </div>
            </footer>
        </div>
    );
};

export default LayoutPage;
