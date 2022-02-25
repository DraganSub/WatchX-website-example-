import { action, makeObservable, observable, runInAction } from "mobx";
import CartStore from "../../Cart/CartStore";
import ProductStore from "../Products/ProductStore";

class ProductDetailsStore {
  constructor() {
    this.productStore = new ProductStore();
    this.productService = this.productStore.productService;
    this.cartStore = new CartStore();

    makeObservable(this, {
      details: observable,
      setDetails: action,
      getIdFromUrl: action,
      setDetailsArr: action,
    });

    this.setDetails();
  }

  //details observable
  details = [];

  //details methods
  async setDetails() {
    const id = this.getIdFromUrl();
    const data = await this.productService.getProductById(id);
    runInAction(() => {
      this.setDetailsArr(data);
    });
  }

  setDetailsArr = (details) => {
    this.details.push(details);
  };

  getIdFromUrl = () => {
    const str = window.location.pathname;
    const char = str.split("/");
    const id = char[2];
    return id;
  };
}
export default ProductDetailsStore;
