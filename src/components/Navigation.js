import React from "react";
import { Navbar } from "flowbite-react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/images/Logo.png";
function Navigation() {
  let navigate = useNavigate();
  return (
    <Navbar fluid={true} rounded={true}>
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Navbar.Brand>
          <img src={Logo} className="mr-3 h-6 sm:h-9" alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link href="/">Homepage</Navbar.Link>
          <Navbar.Link href="/JobVacancy">JobVacancy</Navbar.Link>
          {!Cookies.get("token") && (
            <Navbar.Link href="/Login">Login</Navbar.Link>
          )}
          {Cookies.get("token") && (
            <Navbar.Link href="/Dashboard">Dashboard</Navbar.Link>
          )}
          {Cookies.get("token") && (
            <Navbar.Link
              onClick={() => {
                Cookies.remove("token");
                navigate("/Login");
              }}
            >
              Logout
            </Navbar.Link>
          )}
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default Navigation;
