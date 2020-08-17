import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  state = {};
  render() {
    return (
      <header id="header" data-fullwidth="true">
        <div className="header-inner">
          <div className="container">
            <div id="mainMenu-trigger">
              <Link to="#" className="lines-button x">
                <span className="lines"></span>
              </Link>
            </div>

            <div id="mainMenu">
              <div className="container">
                <nav>
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li className="dropdown">
                      <Link to="/newBook">Add Book</Link>
                    </li>
                    <li className="dropdown mega-menu-item">
                      <Link to="/cart">Cart</Link>
                    </li>
                    <li className="dropdown mega-menu-item">
                      <Link to="/register">Register</Link>
                    </li>
                    <li className="dropdown mega-menu-item">
                      <Link to="/login">Login</Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
