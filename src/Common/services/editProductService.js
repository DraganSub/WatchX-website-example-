import FirebaseService from "./firebaseService";

class EditProductService {
  constructor() {
    this.firebaseService = new FirebaseService();
  }

  updateProduct = async (id, items) => {
    await this.firebaseService.product(id).update({ ...items, productId: id });

    const data = await this.firebaseService.db.ref("cart");
    data.on("value", (snap) => {
      snap.forEach((item) => {
        let uidKey = item.key;
        item.forEach((i) => {
          let key = i.key;
          this.firebaseService.db
            .ref(`cart/${uidKey}/${key}`)
            .orderByChild("productId")
            .equalTo(id)
            .once("value", function (child) {
              child.ref.update(items);
            });
        });
      });
    });
  };

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
}

export default EditProductService;
