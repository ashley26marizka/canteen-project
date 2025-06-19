import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <h2 className="mb-0">Break Bites</h2>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item me-3">
              <Link className="nav-link" to="/shops">Home</Link>
            </li>
            <li className="nav-item me-3">
              <Link className="nav-link" to="/cart">Cart</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
