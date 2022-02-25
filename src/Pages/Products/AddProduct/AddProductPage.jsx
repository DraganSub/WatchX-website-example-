import React from "react";
import { inject, observer } from "mobx-react";
import "../styles.scss";
import Button from "../../../Components/Button";
import { Navigate } from "react-router-dom";
import FormInput from "../../../Components/FormInput";
import SelectForm from "../../../Components/SelectForm";
import AddProductStore from "./AddProductStore";

class AddProductPage extends React.Component {
  render() {
    const {
      productName,
      productPrice,
      productDesc,
      productWeight,
      productWaterResistance,
      productImgLink1,
      productImgLink2,
      productImgLink3,
      productImgLink4,
    } = this.props.addProductStore;

    const addProductStore = this.props.addProductStore;

    return (
      <section className="add-product">
        <div className="add-product-container">
          <div className="add-product-title">
            <h1>Add Product</h1>
          </div>

          {addProductStore.redirect ? <Navigate to="/admin" /> : null}
          <div className="add-product-form">
            <form onSubmit={(e) => addProductStore.handleSubmit(e)}>
              <FormInput
                type="text"
                value={productName}
                handleChange={addProductStore.setProductName}
                name="productName"
                placeholder="Product Name"
                label="Product Name"
              />

              <FormInput
                type="number"
                value={productPrice}
                handleChange={addProductStore.setProductPrice}
                name="productPrice"
                placeholder="Product Price"
                label="Product Price"
              />

              <textarea
                name="productDesc"
                id=""
                cols="30"
                rows="10"
                value={productDesc}
                onChange={addProductStore.setProductDesc}
                placeholder="Product Desc"
              />

              <FormInput
                type="number"
                value={productWeight}
                handleChange={addProductStore.setProductWeight}
                name="productWeight"
                placeholder="Product Weight"
                label="Product Weight"
              />

              <FormInput
                type="text"
                value={productWaterResistance}
                handleChange={addProductStore.setProductWaterResistance}
                name="productWaterResistance"
                placeholder="Product Water Resistance"
                label="Product Water Resistance"
              />

              <SelectForm
                name="productGender"
                setData={addProductStore.setGender}
                optionPlaceholder="-- Choose Gender --"
                list={addProductStore.genderList}
                label="Gender"
              />

              <SelectForm
                name="productWarranty"
                setData={addProductStore.setWarranty}
                optionPlaceholder="-- Choose Warranty --"
                list={addProductStore.warrantyList}
                label="Warranty"
              />

              <SelectForm
                name="productCaseShape"
                setData={addProductStore.setShape}
                optionPlaceholder="-- Choose Shape --"
                list={addProductStore.shapeList}
                label="Case Shape"
              />

              <SelectForm
                name="productManufacturer"
                setData={addProductStore.setManufacturer}
                optionPlaceholder="-- Choose Manufacturer --"
                list={addProductStore.manufacturerList}
                label="Manufacturer"
              />

              <SelectForm
                name="productType"
                setData={addProductStore.setType}
                optionPlaceholder="-- Choose Type --"
                list={addProductStore.typeList}
                label="Type"
              />

              <SelectForm
                name="productCountry"
                setData={addProductStore.setCountry}
                optionPlaceholder="-- Choose Country Of Origin --"
                list={addProductStore.countryOfOriginList}
                label="Country of origin"
              />

              <FormInput
                type="text"
                value={productImgLink1}
                handleChange={addProductStore.setProductImgLink1}
                name="productImgLink1"
                placeholder="Product ImgLink Main"
                label="Image link Main"
              />

              <FormInput
                type="text"
                value={productImgLink2}
                handleChange={addProductStore.setProductImgLink2}
                name="productImgLink2"
                placeholder="Product ImgLink2"
                label="Image Link2"
              />

              <FormInput
                type="text"
                value={productImgLink3}
                handleChange={addProductStore.setProductImgLink3}
                name="productImgLink3"
                placeholder="Product ImgLink3"
                label="Image Link3"
              />

              <FormInput
                type="text"
                value={productImgLink4}
                handleChange={addProductStore.setProductImgLink4}
                name="productImgLink4"
                placeholder="Product ImgLink4"
                label="Image Link4"
              />

              <Button type="submit">Add product</Button>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

export default inject((rootStore) => ({
  addProductStore: new AddProductStore(rootStore),
}))(observer(AddProductPage));
