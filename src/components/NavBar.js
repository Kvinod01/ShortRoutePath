import React from "react";
import About from "./About";
import { Link } from "react-router-dom";
function NavBar() {
  return (
    <>
      <nav
        className="fixed-top navbar navbar-expand-lg bg-body-tertiary bg-opacity-50"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <a className="navbar-brand fs-4" href="#">
            <strong>Journey Genie</strong>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  to="/"
                  className="nav-link active fs-5"
                  aria-current="page"
                  href="#"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link fs-5" href="#">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
export default NavBar;
