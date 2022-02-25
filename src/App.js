import { inject, observer } from "mobx-react";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import Admin from "./Pages/Admin/AdminPage";
import Cart from "./Pages/Cart/Cart";
import HomePage from "./Pages/Homepage/Homepage";
import SignInPage from "./Pages/SignIn/SignInPage";
import SignUpPage from "./Pages/SignUp/SignUpPage";
import AppStore from "./Stores/AppStore";
import * as ROUTES from "./Common/constants/routes";
import AddProductPage from "./Pages/Products/AddProduct/AddProductPage";
import EditProductPage from "./Pages/Products/EditProduct/EditProductPage";
import Products from "./Pages/Products/Products/Products";
import ProductDetailsPage from "./Pages/Products/ProductDetails/ProductDetailsPage";
import AboutUsPage from "./Pages/AboutUs/AboutUsPage";

class App extends React.Component {
  render() {
    const { authUser } = this.props.appStore.sessionStore;
    const { isAdmin } = this.props.appStore.sessionStore.authUser || {};
    const { doSignOut } = this.props.appStore.firebaseService;
    const cartSum = this.props.appStore.cartStore.cartItemsSum;

    return (
      <div>
        <MainLayout
          cartSum={cartSum}
          authUser={authUser}
          admin={isAdmin}
          signOut={doSignOut}
        >
          <Routes>
            <Route
              path={ROUTES.ADD_PRODUCT}
              element={
                authUser ? (
                  <AddProductPage />
                ) : (
                  <Navigate to={ROUTES.HOMEPAGE} />
                )
              }
            />
            <Route
              path={ROUTES.CART}
              element={authUser ? <Cart /> : <Navigate to={ROUTES.HOMEPAGE} />}
            />
            <Route path={ROUTES.HOMEPAGE} element={<HomePage />} />
            <Route
              path={ROUTES.SIGN_IN}
              element={
                authUser ? <Navigate to={ROUTES.HOMEPAGE} /> : <SignInPage />
              }
            />
            <Route
              path={ROUTES.SIGN_UP}
              element={
                authUser ? <Navigate to={ROUTES.HOMEPAGE} /> : <SignUpPage />
              }
            />
            <Route
              path={ROUTES.ADMIN}
              element={authUser ? <Admin /> : <Navigate to={ROUTES.HOMEPAGE} />}
            />
            <Route
              path={ROUTES.EDIT_PRODUCT}
              element={
                authUser ? (
                  <EditProductPage />
                ) : (
                  <Navigate to={ROUTES.HOMEPAGE} />
                )
              }
            />
            <Route
              path={ROUTES.PRODUCT_DETAILS_PAGE}
              element={<ProductDetailsPage />}
            />
            <Route path={ROUTES.PRODUCTS} element={<Products />} />
            <Route path={ROUTES.ABOUT_US} element={<AboutUsPage />} />
          </Routes>
        </MainLayout>
      </div>
    );
  }
}

export default inject((rootStore) => ({
  appStore: new AppStore(rootStore),
}))(observer(App));
