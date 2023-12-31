import React from "react";

import { Link, NavLink } from "react-router-dom";

import "./Navbar.css"

export const Navbar = () => {
    return <nav>
        <Link to="/" className="title">Chess Royal</Link>
        <div className="menu">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <ul>    
            <li>
                <NavLink to="/About">About</NavLink>
            </li>
            <li>
                <NavLink to="/Chess">Chess</NavLink>
            </li>
            <li>
                <NavLink to="/Contact">Contact</NavLink>
            </li>
        </ul>
        </nav>
}