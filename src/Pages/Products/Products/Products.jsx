import { inject, observer } from "mobx-react";
import React from "react";
import { Link } from "react-router-dom";
import SortingOptionsBox from "../../../Common/SortingOptionBox";
import Button from "../../../Components/Button";
import Pagination from "../../../Components/Pagination";
import SearchFilter from "../../../Components/SearchFilter";
import ProductStore from "./ProductStore";
import "../styles.scss";

class Products extends React.Component {
  render() {
    const products = this.props.productStore.currentProducts;
    const { uid, isAdmin } =
      this.props.productStore.sessionStore.authUser || {};
    const product = this.props.productStore;

    return (
      <div>
        <section className="products-hero">
          <div className="product-grid-hero-bg"></div>
          <div className="products-title">
            <span>Products</span>
            <SearchFilter
              searchText={product.searchText}
              onChangeSearchText={product.changeSearchText}
            />
          </div>
        </section>

        <section className="products-catalogue-container">
          <div className="sorting-container">
            <div className="top-sorting-header">
              <span className="title">Catalogue</span>
              <div className="filters-btn">
                <button
                  onClick={() => product.setIsClicked()}
                  className="toggle-filter"
                >
                  Filters
                </button>
              </div>
            </div>
            <div
              className={
                product.isClicked ? "sorting-options active" : "display-none"
              }
            >
              <button
                className={
                  product.isClicked ? "display-none web-none" : " close-filter"
                }
              ></button>
              <SortingOptionsBox onSort={product.setSortElements} />
            </div>
          </div>
          <div className="products-wrap">
            <div className="products-wrap-container">
              <div id="product-title-and-option">
                <div>
                  <span className="title">Catalogue</span>
                </div>
              </div>
              {products.map((m) => (
                <div className="product" key={m.productId}>
                  <Link to={`/product/${m.productId}`}>
                    <div className="image">
                      <img src={m.productImgLink1} />
                    </div>
                  </Link>
                  <div className="title">{m.productName}</div>
                  <div className="price">{m.productPrice + ".00 $"}</div>

                  {uid ? (
                    <Button
                      onClick={() => product.incrementCart(uid, m.productId)}
                    >
                      Add to cart
                    </Button>
                  ) : (
                    <Link to={`/product/${m.productId}`}>
                      <Button>See more</Button>
                    </Link>
                  )}
                  {isAdmin ? (
                    <Link to={`/editProduct/${m.productId}`}>
                      <Button>Edit product</Button>
                    </Link>
                  ) : null}
                </div>
              ))}
              <div className="product" id="paginate-products">
                <div className="pagination-products">
                  <Pagination
                    productsPerPage={product.productsPerPage}
                    totalProducts={product.filteredProducts.length}
                    setCurrentPage={product.setCurrentPage}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default inject((rootStore) => ({
  productStore: new ProductStore(rootStore),
}))(observer(Products));
