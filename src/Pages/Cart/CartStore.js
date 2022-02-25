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
      cartQuantityItems: observable,
      token: observable,
      status: observable,
      redirect: observable,

      getPriceTotal: action,
      getCart: action,
      getItems: action,
      removeItemFromCart: action,
      incrementCart: action,
      handleToken: action,
      createPaymentInDb: action,
      setCart: action,

      currentCart: computed,
      cartPriceSum: computed,
      cartItemsSum: computed,
    });
    this.productStore = new ProductStore();
    this.cartService = new CartService();
    const { uid } = JSON.parse(localStorage.getItem("authUser")) || "";
    toast.configure();
    this.getCart(uid);
  }

  //observable cart variables
  token = [];
  status = false;
  redirect = false;
  cart = [];
  cartQuantityItems = [];
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
    await this.cartService.incrementCart(uid, productId);
  };

  decrementCart = async (uid, productId) => {
    await this.cartService.decrementCart(uid, productId);
  };

  getCart = async (uid) => {
    this.getItems();
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

  getItems() {
    const { uid } = JSON.parse(localStorage.getItem("authUser")) || "";
    this.cartService.getCartItemsNumber(uid, (data) =>
      runInAction(() => {
        this.cartQuantityItems = data;
      })
    );
  }

  removeItemFromCart = (uid, productId) => {
    this.cartService.removeItemFromCart(uid, productId);
  };

  //cart computed
  get currentCart() {
    return this.cart.slice();
  }

  get cartItemsSum() {
    const arr = this.cartQuantityItems;
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
    }
    return sum;
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
