import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import HomepageService from "../../Common/services/homepageService";

class HomepageStore {
  constructor() {
    this.homepageService = new HomepageService();

    makeObservable(this, {
      products: observable,
      getProducts: action,
      productsHome: computed,
    });
    this.getProducts();
  }

  products = [];

  getProducts = async () => {
    const data = await this.homepageService.getRandomProducts();
    runInAction(() => {
      this.products = data;
    });
  };

  get productsHome() {
    return this.products.slice();
  }
}

export default HomepageStore;
