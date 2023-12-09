
import React from 'react';
// import { NavLink } from 'react-router-dom';
import './index.css';
const Navbar = () => {
    return (
        <nav className="wd-navigation">
            {/* <div className="nav-container"> */}

            {/* <NavLink exact to="/" className="nav-logo">
                    Recipe Roulette
                </NavLink> */}
            <p className="bold-left-align">Musify</p>

            {/* 导航链接 */}
            <ul className="menu">
                <li className="list-group-item">
                    {/* <NavLink exact to="/" activeClassName="active"> */}
                    Home
                    {/* </NavLink> */}
                </li>
                {/* <li className="list-group-item">
                    {/* <NavLink to="/language" activeClassName="active"> */}
                Language
                {/* </NavLink> */}
            </li> */}
            <li className="list-group-item">
                {/* <NavLink to="/signin" activeClassName="active"> */}
                Sign In/Up
                {/* </NavLink> */}
            </li>
        </ul>
            {/* </div> */ }
        </nav >
    );
};

export default Navbar;
