import React from "react";
import "./styles.scss";
import logo from "../Common/img/watch-logo.png";

const Footer = () => {
  return (
    <section className="footer">
      <div className="footer-container">
        <div className="card">
          <div className="logo">
            <img className="logo" src={logo} alt="logo" />
          </div>
        </div>
        <div className="card ">
          <div className="contactNum">09511616819</div>
          <div className="contactMail">test@hotmail.com</div>
        </div>
        <div className="card">
          <div className="location-city">Moscow</div>
          <div className="location-street">Street In Moscow</div>
        </div>
        <div className="card">
          <div className="working-label">Working Time:</div>
          <div className="working-time">9:00-22:00</div>
        </div>
      </div>

      <div className="copyRight">
        <i>2021 &copy; All Rights Reserved </i>
      </div>
    </section>
  );
};

export default Footer;
