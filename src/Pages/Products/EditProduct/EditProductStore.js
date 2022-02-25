import { action, makeObservable, observable, runInAction } from "mobx";
import {
  countryOfOriginList,
  genderList,
  manufacturerList,
  shapeList,
  typeList,
  warrantyList,
} from "../../../Common/constants/lookups";
import EditProductService from "../../../Common/services/editProductService";
import ProductStore from "../Products/ProductStore";

class EditProductStore {
  constructor() {
    this.productStore = new ProductStore();
    this.productStore.getProducts();
    this.editProductService = new EditProductService();
    const id = this.getIdFromUrl();
    this.editProductService.getProductById(id);
    makeObservable(this, {
      productDetails: observable,
      productName: observable,
      productPrice: observable,
      productDesc: observable,
      productGender: observable,
      productWeight: observable,
      productWarranty: observable,
      productWaterResistance: observable,
      productCaseShape: observable,
      productManufacturer: observable,
      productType: observable,
      productCountry: observable,

      genderList: observable,
      shapeList: observable,
      typeList: observable,
      warrantyList: observable,
      countryOfOriginList: observable,
      manufacturerList: observable,

      redirect: observable,

      handleEdit: action,
      updateProductName: action,
      updateProductPrice: action,
      updateProductDesc: action,
      updateProductGender: action,
      updateProductWeight: action,
      updateProductWarranty: action,
      updateProductWaterResistance: action,
      updateProductCaseShape: action,
      updateProductManufacturer: action,
      updateProductType: action,
      updateProductCountry: action,
      getIdFromUrl: action,
    });
    this.setProductDetails();
  }

  //observable edit product data
  productDetails = "";
  productName = this.productDetails.productName || "";
  productPrice = this.productDetails.productPrice || "";
  productDesc = this.productDetails.productDesc || "";
  productGender = this.productDetails.productGender || "";
  productWeight = this.productDetails.productWeight || "";
  productWarranty = this.productDetails.productWarranty || "";
  productWaterResistance = this.productDetails.productWaterResistance || "";
  productCaseShape = this.productDetails.productCaseShape || "";
  productManufacturer = this.productDetails.productManufacturer || "";
  productType = this.productDetails.productType || "";
  productCountry = this.productDetails.productCountry || "";
  productImgLink1 = this.productDetails.productImgLink1 || "";
  productImgLink2 = this.productDetails.productImgLink2 || "";
  productImgLink3 = this.productDetails.productImgLink3 || "";
  productImgLink4 = this.productDetails.productImgLink4 || "";

  redirect = false;

  genderList = genderList;
  shapeList = shapeList;
  typeList = typeList;
  warrantyList = warrantyList;
  countryOfOriginList = countryOfOriginList;
  manufacturerList = manufacturerList;

  setProductDetails = async () => {
    const id = this.getIdFromUrl();
    const data = await this.editProductService.getProductById(id);
    runInAction(() => {
      this.productDetails = data;
    });
  };

  getIdFromUrl = () => {
    const str = window.location.pathname;
    const char = str.split("/");
    const id = char[2];
    return id;
  };

  //update product methods

  updateProductImgLink1 = (event) => {
    this.productDetails.productImgLink1 = event.target.value;
  };
  updateProductImgLink2 = (event) => {
    this.productDetails.productImgLink2 = event.target.value;
  };
  updateProductImgLink3 = (event) => {
    this.productDetails.productImgLink3 = event.target.value;
  };
  updateProductImgLink4 = (event) => {
    this.productDetails.productImgLink4 = event.target.value;
  };
  updateProductName = (event) => {
    this.productDetails.productName = event.target.value;
  };
  updateProductPrice = (event) => {
    this.productDetails.productPrice = event.target.value;
  };
  updateProductDesc = (event) => {
    this.productDetails.productDesc = event.target.value;
  };
  updateProductWaterResistance = (event) => {
    this.productDetails.productWaterResistance = event.target.value;
  };
  updateProductWeight = (event) => {
    this.productDetails.productWeight = event.target.value;
  };

  //update data with lists

  updateProductCountry = (data) => {
    this.productDetails.productCountry = data;
  };
  updateProductType = (data) => {
    this.productDetails.productType = data;
  };
  updateProductManufacturer = (data) => {
    this.productDetails.productManufacturer = data;
  };
  updateProductCaseShape = (data) => {
    this.productDetails.productCaseShape = data;
  };
  updateProductWarranty = (data) => {
    this.productDetails.productWarranty = data;
  };
  updateProductGender = (data) => {
    this.productDetails.productGender = data;
  };

  handleEdit = async (e) => {
    e.preventDefault();

    const productId = this.getIdFromUrl();
    const productName = this.productDetails.productName;
    const productPrice = this.productDetails.productPrice;
    const productDesc = this.productDetails.productDesc;
    const productGender = this.productDetails.productGender;
    const productWeight = this.productDetails.productWeight;
    const productWarranty = this.productDetails.productWarranty;
    const productWaterResistance = this.productDetails.productWaterResistance;
    const productCaseShape = this.productDetails.productCaseShape;
    const productManufacturer = this.productDetails.productManufacturer;
    const productType = this.productDetails.productType;
    const productCountry = this.productDetails.productCountry;
    const productImgLink1 = this.productDetails.productImgLink1;
    const productImgLink2 = this.productDetails.productImgLink2;
    const productImgLink3 = this.productDetails.productImgLink3;
    const productImgLink4 = this.productDetails.productImgLink4;
    const editedAt = Date();
    await this.editProductService.updateProduct(productId, {
      productName,
      productPrice,
      productDesc,
      productGender,
      productWeight,
      productWarranty,
      productWaterResistance,
      productCaseShape,
      productManufacturer,
      productType,
      productCountry,
      productImgLink1,
      productImgLink2,
      productImgLink3,
      productImgLink4,
      editedAt,
    });
    this.redirect = true;
  };
}

export default EditProductStore;
