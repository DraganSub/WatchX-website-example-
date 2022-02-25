import React from "react";

const Pagination = (props) => {
  const pageNumbers = [];

  for(let i = 1; i <= Math.ceil(props.totalProducts / props.productsPerPage); i++){
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <ul className="pagination-list">
        {pageNumbers.map(number => (           
          <li key={number} className="pagination-list-item">
            <button onClick={() => props.setCurrentPage(number)}>
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;