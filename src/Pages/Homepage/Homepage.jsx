import React from "react";
import { Link } from "react-router-dom";
import Button from "../../Components/Button";
import "./styles.scss";
import * as ROUTES from "../../Common/constants/routes";
import HomepageStore from "./HomepageStore";
import { inject, observer } from "mobx-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AnimationOnScroll } from "react-animation-on-scroll";
toast.configure();

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <section className="section-hero">
          <ToastContainer draggable={false} />
          <div>
            <div className="section-hero-container">
              <AnimationOnScroll animateIn="animate__slideInRight">
                <div className="section-container-wrap">
                  <h1 className="section-title">WatchX</h1>
                  <h2 className="section-description">
                    Find your perfect watch here
                  </h2>
                  <span className="section-products-button">
                    <Link to={ROUTES.PRODUCTS}>
                      <Button>Products</Button>
                    </Link>
                  </span>
                </div>
              </AnimationOnScroll>
            </div>
          </div>
        </section>

        <section className="section-brands">
          <div>
            <ul className="brand-bar">
              <li className="brand-item">
                <img
                  className="brand-item-img"
                  src="https://mediaserver.goepson.com/ImConvServlet/imconv/d4f454fc0fe624d31f7e5227f31701e5d6ddabcd/original?use=productpictures&assetDescr=LOGO1"
                  alt="Orient Watch logo"
                />
              </li>
              <li className="brand-item">
                <img
                  className="brand-item-img"
                  src="https://www.tissotwatches.com/static/version1638803985/frontend/Tissot/default/en_US/images/logo/tissot-white.svg"
                  alt="Tissot"
                />
              </li>
              <li className="brand-item">
                <img
                  className="brand-item-img"
                  alt="brand-item"
                  src="https://www.zenith-watches.com/assets/img/logo-white.svg"
                />
              </li>
              <li className="brand-item">
                <img
                  className="brand-item-img"
                  alt="brand-item"
                  src="https://www.adriaticawatches.ch/images/logo_adr.png"
                />
              </li>
              <li className="brand-item">
                <img
                  className="brand-item-img"
                  alt="brand-item"
                  src="https://www.raymond-weil.com/wp-content/uploads/2018/03/logo-white.svg"
                />
              </li>
            </ul>
          </div>
        </section>

        <section>
          <div className="section-ourMission">
            <div className="ourMission-container">
              <div className="ourMission-wrap">
                <AnimationOnScroll animateIn="animate__slideInLeft">
                  <h1>Our Mission</h1>

                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                  <Link to={ROUTES.ABOUT_US}>
                    <Button>About Us</Button>
                  </Link>
                </AnimationOnScroll>
              </div>
            </div>
          </div>
        </section>

        <section className="chooseGender">
          <div className="gender-container">
            <div className="woman-watch">
              <span>Woman</span>
            </div>
            <div className="man-watch">
              <span>Man</span>
            </div>
          </div>
        </section>

        <section className="product-list">
          <h1>Best Sellers</h1>

          <div className="product-container">
            {this.props.homepageStore.productsHome.map((item) => (
              <div className="card" key={item.productId}>
                <div className="image">
                  <Link to={`product/${item.productId}`}>
                    <img src={item.productImgLink1} alt="image" />
                  </Link>
                </div>
                <div className="title">{item.productName}</div>
                <div className="price">{item.productPrice}$</div>
                <div>
                  <Link to={`product/${item.productId}`}>
                    <Button>See More</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="section-newCollection">
            <div className="newCollection-container">
              <div className="newCollection-wrap">
                <AnimationOnScroll animateIn="animate__slideInUp">
                  <h1>New Collection</h1>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                  <Link to={ROUTES.PRODUCTS}>
                    <Button>See Our Products</Button>
                  </Link>
                </AnimationOnScroll>
              </div>
            </div>
          </div>
        </section>

        <section className="socialNet">
          <div className="socialNet-container">
            <div className="card">
              <div className="social-title">Our Instagram</div>
              <div className="social-quote">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi
                nesciunt ad totam, quisquam fugit culpa, quasi dolorum et
                quibusdam natus
              </div>
              <div className="instagram-btn-div">
                <Button>Instagram</Button>
              </div>
            </div>

            <div className="card">
              <div className="img1-example">
                <img src="https://images.unsplash.com/photo-1604242692760-2f7b0c26856d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80" />
              </div>
            </div>
            <div className="card">
              <div className="img1-example">
                <img src="https://images.unsplash.com/photo-1541452230789-003e928e582b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80" />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default inject((rootStore) => ({
  homepageStore: new HomepageStore(rootStore),
}))(observer(HomePage));
