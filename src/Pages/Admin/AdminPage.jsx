import React from "react";
import AdminStore from "./AdminStore";
import { inject, observer } from "mobx-react";
import "./styles.scss";
import Button from "../../Components/Button";
import Pagination from "../../Components/Pagination";
import { Link } from "react-router-dom";

class Admin extends React.Component {
  render() {
    const userStore = this.props.adminStore.userStore;
    const productStore = this.props.adminStore.productStore;

    return (
      <section className="admin-page">
        <div className="admin-container">
          <div className="box">
            <h1>Users</h1>
            <table>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Option</th>
                </tr>
              </thead>
              <tbody>
                {userStore.users.map((item) => (
                  <tr key={item.email}>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>
                      <Button onClick={() => userStore.deleteUser(item.uid)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="box">
            <h1>Products</h1>

            <div className="wrap">
              {productStore.currentProducts.map((item) => (
                <div className="card" key={item.productId}>
                  <div className="image">
                    <img src={item.productImgLink1} alt="main Image" />
                  </div>
                  <div className="name">{item.productName}</div>
                  <div className="price">{item.productPrice}</div>
                  <div className="buttons">
                    <Link to={`/editProduct/${item.productId}`}>
                      <Button>Edit</Button>
                    </Link>
                    <Button onClick={() => productStore.delete(item.productId)}>
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Pagination
              productsPerPage={productStore.productsPerPage}
              totalProducts={productStore.filteredProducts.length}
              setCurrentPage={productStore.setCurrentPage}
            />
          </div>
        </div>
      </section>
    );
  }
}

export default inject((rootStore) => ({
  adminStore: new AdminStore(rootStore),
}))(observer(Admin));
