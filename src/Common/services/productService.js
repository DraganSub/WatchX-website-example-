import FirebaseService from "./firebaseService";

class ProductService {
  constructor() {
    this.firebaseService = new FirebaseService();
  }

  getProductById = async (id) => {
    let i = [];
    const data = await this.firebaseService.product(id).once("value");
    i.push(data.val());
    return i[0];
  };

  async getProducts() {
    let el = [];
    const data = await this.firebaseService.products();
    data.on("value", (snap) => {
      snap.forEach((item) => {
        el.push({ ...item.val() });
      });
    });
    return el;
  }

  incrementCart = async (uid, prodId) => {
    const req = await this.firebaseService.db
      .ref(`cart/${uid}`)
      .orderByChild("productId")
      .equalTo(prodId)
      .once("value");
    const value = req.val();
    const data = await this.getProductById(prodId);
    if (value) {
      await this.firebaseService.cartItem(uid, prodId).set({
        ...data,
        quantity: this.firebaseService.serverValue.increment(1),
      });
    } else {
      let quantity = 1;
      await this.firebaseService.cartItem(uid, prodId).set({
        ...data,
        quantity: quantity,
      });
    }
  };

  deleteProduct = (id, uid) => {
    this.firebaseService.product(id).remove();
    this.firebaseService.cartItem(uid, id).remove();
  };
}

export default ProductService;
