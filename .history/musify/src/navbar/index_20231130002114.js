// import React from "react";

// const Navbar = () => {
//     return (
//         <nav className="navbar navbar-expand-lg navbar-light bg-light">
//             <a className="navbar-brand" href="#">
//                 Navbar
//             </a>
//             <button
//                 className="navbar-toggler"
//                 type="button"
//                 data-toggle="collapse"
//                 data-target="#navbarNavDropdown"
//                 aria-controls="navbarNavDropdown"
//                 aria-expanded="false"
//                 aria-label="Toggle navigation"
//             >
//                 <span className="navbar-toggler-icon"></span>
//             </button>

//             <div className="collapse navbar-collapse" id="navbarNavDropdown">
//                 <ul className="navbar-nav">
//                     <li className="nav-item active">
//                         <a className="nav-link" href="#">
//                             Home <span className="sr-only">(current)</span>
//                         </a>
//                     </li>
//                     <li className="nav-item">
//                         <a className="nav-link" href="#">
//                             Features
//                         </a>
//                     </li>
//                     <li className="nav-item">
//                         <a className="nav-link" href="#">
//                             Pricing
//                         </a>
//                     </li>
//                     <li className="nav-item dropdown">
//                         <a
//                             className="nav-link dropdown-toggle"
//                             href="#"
//                             id="navbarDropdownMenuLink"
//                             data-toggle="dropdown"
//                             aria-haspopup="true"
//                             aria-expanded="false"
//                         >
//                             Dropdown link
//                         </a>
//                         <div
//                             className="dropdown-menu"
//                             aria-labelledby="navbarDropdownMenuLink"
//                         >
//                             <a className="dropdown-item" href="#">
//                                 Action
//                             </a>
//                             <a className="dropdown-item" href="#">
//                                 Another action
//                             </a>
//                             <a className="dropdown-item" href="#">
//                                 Something else here
//                             </a>
//                         </div>
//                     </li>
//                 </ul>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;
// Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="nav-container">
                {/* Logo 或者站点名称 */}
                {/* <NavLink exact to="/" className="nav-logo">
                    Recipe Roulette
                </NavLink> */}

                {/* 导航链接 */}
                <ul className="nav-menu">
                    <li className="nav-item">
                        {/* <NavLink exact to="/" activeClassName="active"> */}
                        Home
                        {/* </NavLink> */}
                    </li>
                    {/* 语言和注册/登录可以是下拉菜单或者额外的链接 */}
                    {/* <li className="nav-item">
                        <NavLink to="/language" activeClassName="active">
                            Language
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/signin" activeClassName="active">
                            Sign In/Up
                        </NavLink>
                    </li> */}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
