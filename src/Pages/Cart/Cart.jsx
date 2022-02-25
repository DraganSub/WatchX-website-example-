import { inject, observer } from "mobx-react";
import React from "react";
import { Link, Navigate } from "react-router-dom";
import Button from "../../Components/Button";
import CartStore from "./CartStore";
import "./styles.scss";
import StripeCheckout from "react-stripe-checkout";

class Cart extends React.Component {
  render() {
    const { uid } = JSON.parse(localStorage.getItem("authUser"));
    const cartStore = this.props.cartStore;
    return (
      <React.Fragment>
        {cartStore.redirect ? <Navigate to="/" /> : null}
        <div className="cart">
          {cartStore.cart.length !== 0 ? (
            <React.Fragment>
              <section className="cart-container">
                <div className="cart-title">
                  <h1>Your cart:</h1>
                </div>
                <div className="categories">
                  <div className="category-model">Models</div>
                  <div className="category-quantity">Quantity</div>
                  <div className="category-price">Price</div>
                </div>
                {cartStore.currentCart.map((m) => (
                  <div className="cart-wrap" key={m.productId}>
                    <div className="card">
                      <Link to={`/product/${m.productId}`}>
                        <div className="cart-image">
                          <img src={m.productImgLink1} alt="image" />
                        </div>
                      </Link>
                    </div>
                    <div className="card-details">
                      <div className="model-info">
                        <div className="cart-model">
                          <h3>{m.productName}</h3>
                        </div>
                        <div className="add-more-to-cart">
                          {" "}
                          <span
                            onClick={() =>
                              cartStore.decrementCart(uid, m.productId)
                            }
                          >
                            -
                          </span>{" "}
                          {m.quantity}{" "}
                          <span
                            onClick={() =>
                              cartStore.incrementCart(uid, m.productId)
                            }
                          >
                            +
                          </span>
                        </div>
                        <div className="cart-model-price">
                          <span>{m.productPrice}.00 $</span>
                        </div>
                      </div>
                    </div>
                    <div className="card-delete">
                      <div className="delete-from-cart">
                        <span
                          onClick={() =>
                            cartStore.removeItemFromCart(uid, m.productId)
                          }
                        >
                          X
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </section>
              <div className="checkout">
                <div className="checkout-info">
                  <span className="total-label">Total</span>
                  <span className="total-price">
                    {cartStore.cartPriceSum} $
                  </span>
                </div>
                <div className="btn-checkout">
                  <StripeCheckout
                    stripeKey="pk_test_51KG44FAmDHS28oTWW4lXOIDsW8NEqikSqJYTwurOcJHQzyVK8G1apFSchLmKbx9DUXGmy6GXq2LT3EPPUsPxilqO00oz1JUqrr"
                    token={cartStore.handleToken}
                    billingAddress
                    shippingAddress
                    amount={cartStore.cartPriceSum * 100}
                  >
                    <Button>Checkout</Button>
                  </StripeCheckout>
                </div>
              </div>
            </React.Fragment>
          ) : (
            <div className="empty-cart">
              <h1 className="empty-cart-h1">Your cart is empty!</h1>
              <div className="empty-cart-img"></div>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default inject((rootStore) => ({
  cartStore: new CartStore(rootStore),
}))(observer(Cart));
