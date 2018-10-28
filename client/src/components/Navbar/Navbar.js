
import React, { Component } from 'react';
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";


class NavBar extends Component {
  // const {isAuthenticated, user} = this.props.auth;
  
  render(){
    // const {isAuthenticated, user} = this.props.auth;
     const isAuthenticated= true
    

    const authPages = (
     <div>
      <ul className="nav navbar-nav">

    <li className={
    window.location.pathname === "/" || window.location.pathname === "/home"
      ? "active"
      : ""
  }>
    <NavLink to="/" >Home</NavLink>
    </li>

    <li className={
    window.location.pathname === "/search"
      ? "active"
      : ""
  }>
    <NavLink to="/search" >Search</NavLink>
    </li>

  <li className={
    window.location.pathname === "/dashboard"
      ? "active"
      : ""
  }>

    <NavLink to="/dashboard" >Dashboard</NavLink>
    </li>

  <li className={
    window.location.pathname === "/messages"
    ? "active"
    : ""
  }>
  
    <NavLink to="messages">Inbox</NavLink>
    </li>
    
    </ul>
    <ul className="nav navbar-nav navbar-right">
       
    <li>
    <a href="/" className="nav-link" >
                    <img src=""
                        className="rounded-circle"
                        style={{ width: '25px', marginRight: '5px'}} />
                            <span className="glyphicon glyphicon-log-out"></span> Logout
                </a>
                </li>
    </ul>
    </div>
  )

  const guestPages = (
    <div>
      <ul className="nav navbar-nav">

<li className={
window.location.pathname === "/" || window.location.pathname === "/home"
  ? "active"
  : ""
}>
<NavLink to="/" >Home</NavLink>
</li>

<li className={
window.location.pathname === "/search"
  ? "active"
  : ""
}>
<NavLink to="/search" >Search</NavLink>
</li>


</ul>
<ul className="nav navbar-nav navbar-right">
<li className={
window.location.pathname === "/signUp" 
  ? "active"
  : ""
}>
<NavLink to="/signUp" ><span className="glyphicon glyphicon-user"></span> Sign Up</NavLink>
</li>

<li className={
window.location.pathname === "/signIn" 
  ? "active"
  : ""
}>
<NavLink to="/signIn" ><span className="glyphicon glyphicon-log-in"></span> Sign In</NavLink>
</li>
</ul>
    </div>
  )


    return(
      <div>
<nav className="navbar navbar-inverse">

  <div className="container-fluid">
    <div className="navbar-header customNav">
      <a className="navbar-brand " href="#">Wall of Kindness</a>
    </div>
    
    {isAuthenticated ? authPages : guestPages}
    
  </div>
</nav>

      
      
      </div>
  )} 
} 


export default NavBar;


