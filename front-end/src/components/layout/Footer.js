import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <h4 className="text-center mobile-heading">All Right Reserved &copy; 2024 Ismail Abbasi</h4>
      <p className="text-center mt-3">
        <Link to="/">Home <span>↗️</span> </Link> ||
        <Link to="/about">About <span>↗️</span></Link> ||
        <Link to="/policy">Policy <span>↗️</span></Link> ||
        <Link to="/contact">Contact <span>↗️</span></Link>
      </p>
    </div>
  );
}

export default Footer;
