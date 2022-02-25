import UserStore from "../../Stores/UserStore";
import { action, makeObservable } from "mobx";
import SessionStore from "../../Stores/SessionStore";
import ProductStore from "../Products/Products/ProductStore";

class AdminStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.userStore = new UserStore();
    this.productStore = new ProductStore();
    this.sessionStore = new SessionStore();
    this.userStore.getUsersList();
    this.productStore.getProducts();

    makeObservable(this, {
      delete: action,
    });
  }

  delete = (prodId) => {
    this.productStore.delete(prodId);
  };
}

export default AdminStore;
