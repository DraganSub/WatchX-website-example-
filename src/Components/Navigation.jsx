import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./styles.scss";
import logo from "../Common/img/watch-logo.png";
import NavigationStore from "../Stores/NavigationStore";
import { inject, observer } from "mobx-react";
import * as ROUTES from "../Common/constants/routes";

class Navigation extends React.Component {
  render() {
    const { authUser, admin } = this.props;
    const condition = ({ isActive }) => (isActive ? "active-link " : "item");

    return (
      <header className="primary-header flex">
        <Link to={ROUTES.HOMEPAGE}>
          <div>
            <img className="logo" src={logo} alt="logo" />
          </div>
        </Link>
        <button
          onClick={() => this.props.navigationStore.setIsClicked()}
          className={
            this.props.navigationStore.isClicked ? "close-nav" : "toggle-nav"
          }
        ></button>

        <nav>
          <div>
            {authUser ? (
              <ul
                className={
                  this.props.navigationStore.isClicked
                    ? "primary-nav  flex"
                    : "primary-nav active flex"
                }
              >
                <li>
                  <span>
                    <NavLink className={condition} to={ROUTES.HOMEPAGE}>
                      HomePage
                    </NavLink>
                  </span>
                </li>
                <li>
                  <span>
                    <NavLink className={condition} to={ROUTES.ABOUT_US}>
                      About Us
                    </NavLink>
                  </span>
                </li>
                <li>
                  <span>
                    <NavLink className={condition} to={ROUTES.PRODUCTS}>
                      Products
                    </NavLink>
                  </span>
                </li>
                <li>
                  <span>
                    <NavLink className={condition} to={ROUTES.CART}>
                      Cart
                    </NavLink>
                  </span>
                </li>

                {admin ? (
                  <React.Fragment>
                    <li>
                      <span>
                        <NavLink className={condition} to={ROUTES.ADD_PRODUCT}>
                          Add Product
                        </NavLink>
                      </span>
                    </li>

                    <li>
                      <span>
                        <NavLink className={condition} to={ROUTES.ADMIN}>
                          Admin
                        </NavLink>
                      </span>
                    </li>
                  </React.Fragment>
                ) : null}

                <li>
                  <button className="signOut-btn" onClick={this.props.signOut}>
                    Sign out
                  </button>
                </li>
              </ul>
            ) : (
              <div
                className={
                  this.props.navigationStore.isClicked
                    ? "primary-nav  flex"
                    : "primary-nav active flex"
                }
              >
                <li>
                  <NavLink className={condition} to={ROUTES.HOMEPAGE}>
                    Homepage
                  </NavLink>
                </li>

                <li>
                  <NavLink className={condition} to={ROUTES.PRODUCTS}>
                    Products
                  </NavLink>
                </li>

                <li>
                  <NavLink className={condition} to={ROUTES.ABOUT_US}>
                    About Us
                  </NavLink>
                </li>

                <li>
                  <NavLink className={condition} to={ROUTES.SIGN_UP}>
                    Sign Up
                  </NavLink>
                </li>
                <li>
                  <NavLink className={condition} to={ROUTES.SIGN_IN}>
                    Login
                  </NavLink>
                </li>
              </div>
            )}
          </div>
        </nav>
      </header>
    );
  }
}

export default inject((rootStore) => ({
  navigationStore: new NavigationStore(rootStore),
}))(observer(Navigation));
