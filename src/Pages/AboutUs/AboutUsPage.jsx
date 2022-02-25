import React, { Component } from "react";
import Button from "../../Components/Button";
import "./styles.scss";
import { AnimationOnScroll } from "react-animation-on-scroll";

class AboutUsPage extends Component {
  render() {
    return (
      <div className="about-us-page">
        <section className="products-hero">
          <div className="product-grid-hero-bg"></div>
          <div className="products-title">
            <span>About Us</span>
          </div>
        </section>
        <section className="about-us-container">
          <div className="card-about-us"></div>
          <div className="card-about-us">
            <AnimationOnScroll animateIn="animate__slideInLeft">
              <div className="left-container">
                <h1>About Us</h1>
                <p className="about-us-text">
                  {" "}
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut,
                  aliquam aut. Odio earum vel sunt nulla quia, error eum
                  officiis doloremque iste alias sequi consequatur fugiat ullam
                  voluptatum nostrum atque.
                </p>
              </div>
            </AnimationOnScroll>
          </div>
        </section>
        <section className="quality-container">
          <div className="margin-div">
            <AnimationOnScroll animateIn="animate__fadeIn">
              <div className="quality-wrap">
                <div className="card">
                  <h1>Title</h1>
                  <span>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Ut, aliquam aut. Odio earum vel sunt nulla quia, error eum
                    officiis doloremque iste alias sequi consequatur fugiat
                    ullam voluptatum nostrum atque.
                  </span>
                </div>

                <div className="card">
                  <h1>Title</h1>
                  <span>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Ut, aliquam aut. Odio earum vel sunt nulla quia, error eum
                    officiis doloremque iste alias sequi consequatur fugiat
                    ullam voluptatum nostrum atque.
                  </span>
                </div>

                <div className="card">
                  <h1>Title</h1>
                  <span>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Ut, aliquam aut. Odio earum vel sunt nulla quia, error eum
                    officiis doloremque iste alias sequi consequatur fugiat
                    ullam voluptatum nostrum atque.
                  </span>
                </div>

                <div className="card">
                  <h1>Title</h1>
                  <span>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Ut, aliquam aut. Odio earum vel sunt nulla quia, error eum
                    officiis doloremque iste alias sequi consequatur fugiat
                    ullam voluptatum nostrum atque.
                  </span>
                </div>
              </div>
            </AnimationOnScroll>
          </div>
        </section>

        <section className="watch-separation"></section>

        <section className="images-grid">
          <div className="container">
            <div className="wrap">
              <AnimationOnScroll animateIn="animate__lightSpeedInLeft">
                <div className="card"></div>
              </AnimationOnScroll>

              <AnimationOnScroll animateIn="animate__lightSpeedInRight">
                <div className="card"></div>
              </AnimationOnScroll>
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
                <img
                  src="https://images.unsplash.com/photo-1604242692760-2f7b0c26856d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
                  alt="image"
                />
              </div>
            </div>

            <div className="card">
              <div className="img1-example">
                <img
                  src="https://images.unsplash.com/photo-1541452230789-003e928e582b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
                  alt="image"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default AboutUsPage;
