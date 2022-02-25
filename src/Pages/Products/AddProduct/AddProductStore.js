import { action, makeObservable, observable } from "mobx";
import {
  countryOfOriginList,
  genderList,
  manufacturerList,
  shapeList,
  typeList,
  warrantyList,
} from "../../../Common/constants/lookups";
import AddProductService from "../../../Common/services/addProductService";

class AddProductStore {
  constructor() {
    this.addProductService = new AddProductService();
    makeObservable(this, {
      redirect: observable,

      genderList: observable,
      shapeList: observable,
      typeList: observable,
      warrantyList: observable,
      countryOfOriginList: observable,
      manufacturerList: observable,

      productDesc: observable,
      productPrice: observable,
      productName: observable,
      productWeight: observable,
      productWarranty: observable,
      productWaterResistance: observable,
      productCaseShape: observable,
      productManufacturer: observable,
      productType: observable,
      productCountry: observable,
      productImgLink1: observable,
      productImgLink2: observable,
      productImgLink3: observable,
      productImgLink4: observable,

      setManufacturer: action,
      setShape: action,
      setGender: action,
      setType: action,
      setWarranty: action,
      setCountry: action,

      setProductWaterResistance: action,
      setProductImgLink1: action,
      setProductImgLink2: action,
      setProductImgLink3: action,
      setProductImgLink4: action,
      setProductWeight: action,
      setProductName: action,
      setProductPrice: action,
      setProductDesc: action,
      handleSubmit: action,
    });
  }

  //observable add product data
  productName = "";
  productPrice = "";
  productDesc = "";
  productWeight = "";
  productWarranty = "";
  productWaterResistance = "";
  productCaseShape = "";
  productManufacturer = "";
  productType = "";
  productCountry = "";
  productImgLink1 = "";
  productImgLink2 = "";
  productImgLink3 = "";
  productImgLink4 = "";

  redirect = false;

  genderList = genderList;
  shapeList = shapeList;
  typeList = typeList;
  warrantyList = warrantyList;
  countryOfOriginList = countryOfOriginList;
  manufacturerList = manufacturerList;

  //methods for lists
  setShape = (shape) => {
    this.productCaseShape = shape;
  };

  setGender = (gender) => {
    this.productGender = gender;
  };

  setType = (type) => {
    this.productType = type;
  };

  setWarranty = (warranty) => {
    this.productWarranty = warranty;
  };

  setCountry = (country) => {
    this.productCountry = country;
  };

  setManufacturer = (item) => {
    this.productManufacturer = item;
  };

  //methods for add products data
  setProductImgLink1 = (event) => {
    this.productImgLink1 = event.target.value;
  };

  setProductImgLink2 = (event) => {
    this.productImgLink2 = event.target.value;
  };

  setProductImgLink3 = (event) => {
    this.productImgLink3 = event.target.value;
  };

  setProductImgLink4 = (event) => {
    this.productImgLink4 = event.target.value;
  };

  setProductWaterResistance = (event) => {
    this.productWaterResistance = event.target.value;
  };

  setProductWeight = (event) => {
    this.productWeight = event.target.value;
  };

  setProductName = (event) => {
    this.productName = event.target.value;
  };

  setProductPrice = (event) => {
    this.productPrice = event.target.value;
  };

  setProductDesc = (event) => {
    this.productDesc = event.target.value;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    let createdAt = Date();
    await this.addProductService.addProduct({
      productDesc: this.productDesc,
      productName: this.productName,
      productPrice: this.productPrice,
      productGender: this.productGender,
      productWeight: this.productWeight,
      productWarranty: this.productWarranty,
      productWaterResistance: this.productWaterResistance,
      productCaseShape: this.productCaseShape,
      productManufacturer: this.productManufacturer,
      productType: this.productType,
      productCountry: this.productCountry,
      productImgLink1: this.productImgLink1,
      productImgLink2: this.productImgLink2,
      productImgLink3: this.productImgLink3,
      productImgLink4: this.productImgLink4,
      createdAt: createdAt,
    });
    this.redirect = true;
  };
}

export default AddProductStore;
