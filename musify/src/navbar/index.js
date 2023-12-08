import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';
import { AuthContext } from '../AuthContext';

const Navbar = () => {
    const { isAuthenticated, userId } = useContext(AuthContext);
    console.log("isAuthenticated: ", isAuthenticated);

    return (
        <nav className="wd-navigation">
            <p className="bold-left-align">Musify</p>
            <ul className="menu">
                <li className="list-group-item">
                    <NavLink exact to="/" activeClassName="active">
                        Home
                    </NavLink>
                </li>
                <li className="list-group-item">
                    <NavLink to="/language" activeClassName="active">
                        Language
                    </NavLink>
                </li>
                <li className="list-group-item">
                    {isAuthenticated ? (
                        <NavLink to={`/account/${userId}`} activeClassName="active">
                            Account
                        </NavLink>
                    ) : (
                        <NavLink to="/signin" activeClassName="active">
                            Sign In/Up
                        </NavLink>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
