import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom';
import '../styles/Header.css'
import '../styles/DarkMode.css'
import { useSelector, useDispatch } from 'react-redux';
import { signout } from '../actions/UserAction';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import SearchIcon from '@material-ui/icons/Search';

const Header = (props) => {
    // Dark mode state
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('darkMode') === 'true';
    });

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        localStorage.setItem('darkMode', darkMode);
    }, [darkMode]);

    const handleDarkModeToggle = () => {
        setDarkMode((prev) => !prev);
    };

    const dispatch = useDispatch();
    const [dropdown, setDropDown] = useState(false);
    const [secondDropdown, setSecondDropdown] = useState(false);
    const [query, setQuery] = useState('');

    const showDropDown = () => setDropDown((prev) => !prev);
    const showSecondDropDown = () => setSecondDropdown((prev) => !prev);

    const cart = useSelector((state) => state.cart);
    const {cartItems} = cart;

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const signOutHandler = () => {
        dispatch(signout());
    };

    return (
        <>
            <header>
                <div className="container">
                    <div className="inner-content">
                        <div className="brand">
                            <Link to="/">Amazon</Link>
                        </div>
                        <div className="search-bar">
                            <input className="search-input"
                                onChange={(e)=> setQuery(e.target.value)}
                                placeholder="Search products"
                                value={query}
                            />
                            <div className="search-btn">
                                <Link to={`/searchresults/${query}`}>
                                    <SearchIcon/>
                                </Link>
                            </div>
                        </div>
                        <ul className="nav-links">
                            {/* Dark mode switch - left of cart */}
                            <li className="dark-mode-switch">
                                <input
                                    id="darkModeToggle"
                                    type="checkbox"
                                    checked={darkMode}
                                    onChange={handleDarkModeToggle}
                                    aria-label="Toggle dark mode"
                                />
                            </li>
                            <li>
                                <Link to="/cart"><ShoppingCartIcon/>
                                    {cartItems && cartItems.length > 0 && (<p className="badge">{cartItems.length}</p>)}
                                </Link>
                            </li>
                            <li>
                                {userInfo ? (
                                    <div className="header-dropdown">
                                        <p onClick={showDropDown}>
                                            {userInfo.name}
                                            <ArrowDropDownIcon/>
                                        </p>
                                        <ul className={ dropdown? 'dropdown-content show' : 'dropdown-content'}>
                                            <li>
                                               <Link to="/profile">Account</Link> 
                                            </li>
                                            <li>
                                               <Link to="/orderhistory">Order History</Link> 
                                            </li>
                                            <li>
                                               <Link to="/" onClick={signOutHandler}>Sign out</Link> 
                                            </li>
                                        </ul>
                                    </div>
                                ) : (
                                    <Link to="/signin"><AccountCircleIcon/></Link>
                                )}
                            </li>
                            {userInfo && userInfo.isAdmin && (
                                <li>
                                    <div className="header-dropdown">
                                        <p onClick={showSecondDropDown}>
                                            Admin 
                                            <ArrowDropDownIcon/>
                                        </p>
                                        <ul className={ secondDropdown? 'dropdown-content show' : 'dropdown-content'}>
                                            <li>
                                               <Link to="/productlist">Products</Link> 
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
                <div className="category-container">
                    <ul>
                        <li><Link to="/category/mobile">Mobile</Link></li>
                        <li><Link to="/category/laptop">Laptop</Link></li>
                        <li><Link to="/category/monitor">Monitor</Link></li>
                        <li><Link to="/category/accessories">Computer Accessories</Link></li>
                        <li><Link to="/category/earphones">Earphones</Link></li>
                    </ul>
                </div>
            </header>
        </>
    )
}

export default Header
