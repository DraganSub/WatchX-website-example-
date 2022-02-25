import {
  makeObservable,
  observable,
  action,
  computed,
  runInAction,
} from "mobx";

import ProductService from "../../../Common/services/productService";
import SessionStore from "../../../Stores/SessionStore";
import sortItemsBy from "../../../Common/sortItemsBy";
import getCurrentIndex from "../../../Common/getCurrentIndex";

class ProductStore {
  constructor() {
    this.productService = new ProductService();
    this.sessionStore = new SessionStore();

    this.getProducts();
    makeObservable(this, {
      products: observable,
      currentPage: observable,
      searchText: observable,
      sortElements: observable,
      productsPerPage: observable,
      isClicked: observable,
      redirect: observable,
      loading: observable,

      changeSearchText: action,
      incrementCart: action,
      setCurrentPage: action,
      setSortElements: action,
      setIsClicked: action,
      setProducts: action,
      setLoading: action,

      filteredProducts: computed,
      currentProducts: computed,
    });

    this.getProducts();
  }

  loading = false;
  //products observables
  sortElements = {
    sortBy: "productName",
    direction: "ascending",
  };
  productsPerPage = 12;
  searchText = "";
  products = [];
  currentPage = 1;
  redirect = false;
  isClicked = false;

  //products methods
  setIsClicked = () => {
    this.isClicked = !this.isClicked;
  };
  setCurrentPage = (pageNum) => {
    this.currentPage = pageNum;
  };

  changeSearchText = (event) => {
    this.searchText = event.target.value;
  };

  setSortElements = (sortBy, direction) => {
    this.sortElements = { sortBy, direction };
  };
  setLoading = (loading) => {
    this.loading = loading;
  };

  getProducts = async () => {
    this.loading = true;
    const data = await this.productService.getProducts();
    runInAction(() => {
      this.setProducts(data);
      this.loading = false;
    });
  };

  incrementCart = (uid, prodId) => {
    this.productService.incrementCart(uid, prodId);
  };

  delete = (productId) => {
    const { uid } = this.sessionStore.authUser || {};
    this.productService.deleteProduct(productId, uid);
  };

  setProducts = (products) => {
    this.products = products;
  };
  //products computed

  get filteredProducts() {
    const search = this.searchText.toLowerCase();

    const sortedProducts = sortItemsBy(
      this.products.slice(),
      this.sortElements.direction,
      this.sortElements.sortBy
    );
    return sortedProducts.filter(
      (product) =>
        product.productName.toLowerCase().includes(search) ||
        product.productDesc.toLowerCase().includes(search)
    );
  }

  get currentProducts() {
    return getCurrentIndex(
      this.filteredProducts,
      this.currentPage,
      this.productsPerPage
    );
  }
}

export default ProductStore;
