import FirebaseService from "./firebaseService";

class AddProductService {
  constructor() {
    this.firebaseService = new FirebaseService();
  }

  addProduct = async (items) => {
    const id = this.firebaseService.products().push().key;
    await this.firebaseService
      .products()
      .update({ [id]: { ...items, productId: id } });
  };
}

export default AddProductService;
