import {
  action,
  makeObservable,
  observable,
  computed,
  runInAction,
} from "mobx";
import CartService from "../../Common/services/cartService";
import ProductStore from "../Products/Products/ProductStore";
import axios from "axios";
import { toast } from "react-toastify";

class CartStore {
  constructor() {
    makeObservable(this, {
      cart: observable,
      totalPrice: observable,
      token: observable,
      status: observable,
      redirect: observable,

      getPriceTotal: action,
      getCart: action,
      removeItemFromCart: action,
      incrementCart: action,
      handleToken: action,
      createPaymentInDb: action,
      setCart: action,

      currentCart: computed,
      cartPriceSum: computed,
    });
    const { uid } = JSON.parse(localStorage.getItem("authUser")) || "";
    this.productStore = new ProductStore();
    this.cartService = new CartService();
    toast.configure();
    this.getCart(uid);
  }

  //observable cart variables
  token = [];
  status = false;
  redirect = false;
  cart = [];
  totalPrice = [];

  toArray = (obj) => {
    const result = [];
    for (const key in obj) {
      const value = obj[key];
      result.push(value);
    }
    return result;
  };

  //cart methods
  createPaymentInDb = (uid, token) => {
    this.cartService.createPaymentInDB(uid, token, (this.status = true));
  };

  handleToken = async (token) => {
    const cart = {
      sum: this.cartPriceSum,
    };
    const { uid } = JSON.parse(localStorage.getItem("authUser"));
    const response = await axios.post(
      "https://hwm4e.sse.codesandbox.io/checkout",
      {
        token,
        cart,
      }
    );
    const { status } = response.data;
    if (status === "success") {
      toast("Success!", { type: "success" });
      this.createPaymentInDb(uid, token);
      runInAction(() => {
        this.redirect = true;
      });
      this.cartService.removeCart(uid);
    } else {
      toast("Error", { type: "error" });
    }
  };

  incrementCart = async (uid, productId) => {
    const data = await this.cartService.incrementCart(uid, productId);

    runInAction(() => {
      this.setCart(data);
    });
    this.getPriceTotal();
  };

  decrementCart = async (uid, productId) => {
    const data = await this.cartService.decrementCart(uid, productId);

    runInAction(() => {
      this.setCart(data);
    });
    this.getPriceTotal();
  };

  getCart = async (uid) => {
    this.getPriceTotal();
    const data = await this.cartService.getCart(uid);
    runInAction(() => {
      this.setCart(data);
    });
  };

  setCart = (cart) => {
    this.cart = cart;
  };

  getPriceTotal = async () => {
    const { uid } = JSON.parse(localStorage.getItem("authUser")) || "";
    const data = await this.cartService.getCartItemsPrice(uid);
    runInAction(() => {
      this.totalPrice = data;
    });
  };

  removeItemFromCart = async (uid, productId) => {
    await this.cartService.removeItemFromCart(uid, productId);
    const data = await this.cartService.getCart(uid);
    runInAction(() => {
      this.setCart(data);
    });
  };

  //cart computed
  get currentCart() {
    return this.cart.slice();
  }

  get cartPriceSum() {
    const array = this.totalPrice;
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
      sum += parseFloat(array[i]);
    }
    return sum.toFixed(2);
  }
}

export default CartStore;

