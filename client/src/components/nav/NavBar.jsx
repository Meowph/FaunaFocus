import { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import { logout } from "../../services/UserProfileService.jsx";
import "./Navbar.css"
import logo from "../logo/logo.jpg"


export const NavBar = ({ isLoggedIn, setIsLoggedIn, currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const handleLinkClick = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 150); // Adjust the delay here (300ms = 0.3 seconds)
  };

  return (
    <div>
      <Navbar>
        <NavbarBrand tag={RRNavLink} to="/home">
        <img
            src={logo} // Replace with your image URL or path
            alt="Logo"
            style={{ width: '35px', height: '35px', marginRight: '10px', borderRadius: '30px'}} // Adjust size and margin as needed
          />
          Fauna Focus
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          {/* <Nav className="mr-auto" navbar> */}
          <Nav navbar>
            {isLoggedIn && (
              <>
                <NavItem>
                  <NavLink style={{paddingLeft:"25px"}} tag={RRNavLink} to="/post" onClick={handleLinkClick}>
                    Posts
                  </NavLink>
                  <NavLink tag={RRNavLink} to="/experiences" onClick={handleLinkClick}>
                    Experiences
                  </NavLink>
                  <NavLink style={{paddingLeft:"10px"}} tag={RRNavLink} to="/map" onClick={handleLinkClick}>
                    World Map
                  </NavLink>
                </NavItem>
                <NavItem>
                  <a
                    aria-current="page"
                    className="nav-link"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      logout();
                      setIsLoggedIn(false);
                    }}
                  >
                    Logout
                  </a>
                </NavItem>
              </>
            )}
            {!isLoggedIn && (
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/login">
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/register">
                    Register
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}