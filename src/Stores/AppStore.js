import FirebaseService from "../Common/services/firebaseService";
import CartStore from "../Pages/Cart/CartStore";
import ProductStore from "../Pages/Products/Products/ProductStore";
import SessionStore from "./SessionStore";

class AppStore {
  constructor() {
    this.sessionStore = new SessionStore();
    this.firebaseService = new FirebaseService();
    this.cartStore = new CartStore();

    this.productStore = new ProductStore();
    this.sessionStore.setAuthUser(JSON.parse(localStorage.getItem("authUser")));

    this.listener = this.firebaseService.onAuthUserListener(
      (authUser) => {
        localStorage.setItem("authUser", JSON.stringify(authUser));
        this.sessionStore.setAuthUser(authUser);
      },
      () => {
        localStorage.removeItem("authUser");
        this.sessionStore.setAuthUser(null);
      }
    );
  }
}

export default AppStore;
