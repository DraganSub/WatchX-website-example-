import React from "react";
import { inject, observer } from "mobx-react";
import { Navigate} from "react-router-dom";
import Button from "../../../Components/Button";
import FormInput from "../../../Components/FormInput";
import SelectForm from "../../../Components/SelectForm";
import EditProductStore from "./EditProductStore";



class EditProduct extends React.Component{
  render(){
    const { productName,
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
      productImgLink4} = this.props.editProductStore.productDetails;
    const editProductStore = this.props.editProductStore;
        
    return(
      <section className="add-product">
        <div className="add-product-container">
          <div className="add-product-title">
            <h1>Edit Product</h1>
          </div>
          {editProductStore.redirect ? <Navigate to="/admin" /> : null}
          <div className="add-product-form">
            <form onSubmit={e => editProductStore.handleEdit(e)}>

              <FormInput 
                type="text"
                name="productName"
                defaultValue={productName}
                handleChange={editProductStore.updateProductName}
                placeholder="Product Name"
                label="Product Name"
              />
                        
                        
              <FormInput 
                type="text"
                name="productPrice"
                defaultValue={productPrice}
                handleChange={editProductStore.updateProductPrice}
                placeholder="Product Price"
                label="Price"
              />

              <textarea 
                name="productDesc" 
                id=""  
                cols="30" 
                rows="10" 
                value={productDesc}
                onChange={editProductStore.updateProductDesc}
                placeholder="Product Desc"
              />  
                        
              <SelectForm 
                name="productGender"
                value={productGender}
                setData={editProductStore.updateProductGender}
                optionPlaceholder = "-- Choose Gender --"
                list={editProductStore.genderList}
                label="Gender"
              />

              <SelectForm 
                name="productWarranty"
                value={productWarranty}
                setData={editProductStore.updateProductWarranty}
                optionPlaceholder = "-- Choose Warranty --"
                list={editProductStore.warrantyList}
                label="Warranty"
              />

              <SelectForm 
                name="productCaseShape"
                value={productCaseShape}
                setData={editProductStore.updateProductCaseShape}
                optionPlaceholder = "-- Choose Case Shape --"
                list={editProductStore.shapeList}
                label="Case Shape"
              />


              <SelectForm 
                name="productManufacturer"
                value={productManufacturer}
                setData={editProductStore.updateProductManufacturer}
                optionPlaceholder = "-- Choose Manufacturer --"
                list={editProductStore.manufacturerList}
                label="Manufacturer"
              />



              <SelectForm 
                name="productType"
                value={productType}
                setData={editProductStore.updateProductType}
                optionPlaceholder = "-- Choose Type of Watch --"
                list={editProductStore.typeList}
                label="Type"
              />

                        
              <SelectForm 
                name="productType"
                value={productCountry}
                setData={editProductStore.updateProductCountry}
                optionPlaceholder = "-- Choose Country Of Origin --"
                list={editProductStore.countryOfOriginList}
                label="Country Of Origin"
              />


              <FormInput 
                type="number"
                name="productWeight"
                defaultValue={productWeight}
                handleChange={editProductStore.updateProductWeight}
                placeholder="Product Weight"
                label="Weight"
              />

              <FormInput 
                type="text"
                name="productWaterResistance"
                defaultValue={productWaterResistance}
                handleChange={editProductStore.updateProductWaterResistance}
                placeholder="Product Water Resistance"
                label="Water Resistance"
              />

              <FormInput 
                type="text"
                name="productImgLink1"
                defaultValue={productImgLink1}
                handleChange={editProductStore.updateProductImgLink1}
                placeholder="Product ImgLink1"
                label="Image Link Main"
              />

              <FormInput 
                type="text"
                name="productImgLink2"
                defaultValue={productImgLink2}
                handleChange={editProductStore.updateProductImgLink2}
                placeholder="Product ImgLink2"
                label="Image link2"
              />

              <FormInput 
                type="text"
                name="productImgLink3"
                defaultValue={productImgLink3}
                handleChange={editProductStore.updateProductImgLink3}
                placeholder="Product ImgLink3"
                label="Image link3"
              />

              <FormInput 
                type="text"
                name="productImgLink4"
                defaultValue={productImgLink4}
                handleChange={editProductStore.updateProductImgLink4}
                placeholder="Product ImgLink4"
                label="Image link4"
              />

              <Button type="submit">
                Edit product
              </Button>
            </form>
          </div>
        </div>
      </section>
    );
  }

}

export default inject(rootStore => ({
  editProductStore: new EditProductStore (rootStore)
}))(observer(EditProduct));