import React from "react";
import SortOption from "./SortOption";

export default function SortingOptionsBox(props){
  return(
    <React.Fragment>
      <div className="card">
        <span className="card-title">Sort by Name</span>
        <SortOption onSort={props.onSort} sortBy="productName" />
      </div>
      <div className="card">
        <span className="card-title">Sort by Brand</span>
        <SortOption onSort={props.onSort} sortBy="productBrand" />
      </div>
      <div className="card">
        <span className="card-title">Sort by Gender</span>
        <SortOption onSort={props.onSort} sortBy="productGender" />
      </div>
    </React.Fragment>
  );
}