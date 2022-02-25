import React from "react";

const SearchFilter = (props) => {
  return (
    <div className="search-filter">
      <input 
        type="text"
        placeholder="Search"
        value={props.searchText}
        onChange={(e) => props.onChangeSearchText(e)}
      />
    </div>
  );
};

export default SearchFilter;


