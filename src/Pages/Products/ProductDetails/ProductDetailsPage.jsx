import { inject, observer } from "mobx-react";
import React from "react";
import { Link } from "react-router-dom";
import Button from "../../../Components/Button";
import ProductDetailsStore from "./ProductsDetailsStore";
import * as ROUTES from "../../../Common/constants/routes";
class ProductDetailsPage extends React.Component {
  render() {
    const details = this.props.productDetailsStore.details;
    const { uid } = JSON.parse(localStorage.getItem("authUser")) || "";

    return (
      <section className="product-details-page">
        <div className="product-details-container">
          <div className="card">
            <div className="card-img">
              <div className="card-elements">
                {details.map((item) => (
                  <React.Fragment key={item.productId}>
                    <div className="el">
                      <img src={item.productImgLink2} />
                    </div>
                    <div className="el">
                      <img src={item.productImgLink3} />
                    </div>
                    <div className="el">
                      <img src={item.productImgLink4} />
                    </div>
                  </React.Fragment>
                ))}
              </div>

              <div className="card-main-img">
                {details.map((item) => (
                  <div key={item.productId}>
                    <img src={item.productImgLink1} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-container">
              {details.map((item) => (
                <React.Fragment key={item.productId}>
                  <div className="card-title" key={item.productId}>
                    <h1>{item.productName}</h1>
                  </div>
                  <div className="card-price">
                    <span>{item.productPrice + " $"}</span>
                  </div>
                  <div className="card-add">
                    {uid ? (
                      <Link to="/cart">
                        <Button
                          onClick={() =>
                            this.props.productDetailsStore.productStore.incrementCart(
                              uid,
                              item.productId
                            )
                          }
                        >
                          Add To Cart
                        </Button>
                      </Link>
                    ) : (
                      <React.Fragment>
                        <div className="label-sign">
                          Sign In or Sign Up to buy products
                        </div>
                        <div>
                          <Link to={ROUTES.SIGN_IN}>
                            <Button>Sign In</Button>
                          </Link>
                          <span className="or">or</span>
                          <Link to={ROUTES.SIGN_UP}>
                            <Button>Sign Up</Button>
                          </Link>
                        </div>
                      </React.Fragment>
                    )}
                  </div>
                  <div className="card-warranty">
                    <span>
                      <i>{item.productWarranty}</i>
                    </span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="card">
            <div className="info-container">
              {details.map((item) => (
                <React.Fragment key={item.productId}>
                  <div className="info-label">Gender</div>
                  <div className="info-el">{item.productGender}</div>
                  <div className="info-label">Weight</div>
                  <div className="info-el">{item.productWeight}</div>
                  <div className="info-label">Warranty</div>
                  <div className="info-el">{item.productWarranty}</div>
                  <div className="info-label">Water Resistance</div>
                  <div className="info-el">{item.productWaterResistance}</div>
                  <div className="info-label">Case Shape</div>
                  <div className="info-el">{item.productCaseShape}</div>
                  <div className="info-label">Manufacturer</div>
                  <div className="info-el">{item.productManufacturer}</div>
                  <div className="info-label">Type</div>
                  <div className="info-el">{item.productType}</div>
                  <div className="info-label">Country of Origin</div>
                  <div className="info-el">{item.productCountry}</div>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="desc-container">
              {details.map((item) => (
                <React.Fragment key={item.productId}>
                  <div className="desc-label">Description</div>
                  <div className="description-text">{item.productDesc}</div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default inject((rootStore) => ({
  productDetailsStore: new ProductDetailsStore(rootStore),
}))(observer(ProductDetailsPage));
