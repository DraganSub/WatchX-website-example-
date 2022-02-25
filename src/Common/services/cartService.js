import FirebaseService from "./firebaseService";
import { v4 as uuidv4 } from "uuid";
class CartService {
  constructor() {
    this.firebaseService = new FirebaseService();
  }

  getProductById = async (id) => {
    let i = [];
    const data = await this.firebaseService.product(id);
    data.on("value", (snap) => {
      let item = [];
      item.push({ ...snap.val() });

      for (let key in item) {
        let value = item[key];
        i = value;
      }
    });
    return i;
  };

  getCart = async (uid) => {
    let result = [];
    const data = await this.firebaseService.db.ref(`cart/${uid}`);
    data.on("value", (snapshot) => {
      snapshot.forEach((item) => {
        result.push({ ...item.val() });
      });
    });
    return result;
  };

  getCartItemsNumber(uid, callback) {
    this.firebaseService.db
      .ref(`cart/${uid}`)
      .orderByChild("quantity")
      .on("value", (snap) => {
        let result = [];
        snap.forEach((item) => {
          result.push(item.val().quantity);
        });
        callback(result);
      });
  }

  incrementCart = async (uid, prodId) => {
    const data = await this.firebaseService.db
      .ref(`cart/${uid}`)
      .orderByChild("productId")
      .equalTo(prodId)
      .once("value");

    data.forEach((snap) => {
      let value = snap.val();
      if (value) {
        this.firebaseService.cartItem(uid, prodId).update({
          ...this.getProductById(prodId),
          quantity: this.firebaseService.serverValue.increment(1),
        });
      } else {
        let quantity = 1;
        this.firebaseService.cartItem(uid, prodId).update({
          ...this.getProductById(prodId),
          quantity: quantity,
        });
      }
    });
  };

  decrementCart = async (uid, prodId) => {
    const data = await this.firebaseService.db
      .ref(`cart/${uid}`)
      .orderByChild("productId")
      .equalTo(prodId)
      .once("value");

    data.forEach((snap) => {
      let value = snap.val();
      if (value.quantity === 1) {
        this.firebaseService.cartItem(uid, prodId).remove();
      } else if (value) {
        this.firebaseService.cartItem(uid, prodId).update({
          ...this.getProductById(prodId),
          quantity: this.firebaseService.serverValue.increment(-1),
        });
      } else {
        let quantity = 1;
        this.firebaseService.cartItem(uid, prodId).update({
          ...this.getProductById(prodId),
          quantity: quantity,
        });
      }
    });
  };

  getCartItemsPrice = async (uid) => {
    let result = [];
    const data = await this.firebaseService.db
      .ref(`cart/${uid}`)
      .orderByChild("productPrice");

    data.on("value", (snap) => {
      snap.forEach((item) => {
        result.push(item.val().productPrice * item.val().quantity);
      });
    });
    return result;
  };

  createPaymentInDB(uid, token) {
    let randomK = uuidv4();
    this.firebaseService.db
      .ref("payments")
      .child(uid)
      .child(randomK)
      .set({ ...token, paymentId: randomK });
  }

  removeCart = (uid) => {
    this.firebaseService.db.ref("cart").child(uid).remove();
  };
  removeItemFromCart = (uid, productId) => {
    this.firebaseService.cartItem(uid, productId).remove();
  };
}

export default CartService;
