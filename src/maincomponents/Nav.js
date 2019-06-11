import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { getJwt, getUsername } from '../helpers';

class Nav extends Component {
    render(){
        const token = getJwt();
        if(token){
            return (
                <nav className="navbar navbar-light bg-light">
                   <Link to="/logged" className="navbar-brand">Home</Link>
                   <span className="navbar-brand mb-0 h1">{getUsername()}</span>
                   <Link to="/logout" className="navbar-brand">Sign Out</Link>
                </nav>
                );
        }else{
            return (
                <nav className="navbar navbar-light bg-light">
                    <Link to="/" className="navbar-brand">Home</Link>
                    <Link to="/login" className="navbar-brand">Login</Link>
                    <Link to="/register" className="navbar-brand">Register</Link>               
                </nav>
            );
        }
    }
}

export default Nav;