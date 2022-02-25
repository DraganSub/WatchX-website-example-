import React from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
function MainLayout(props) {
  return (
    <React.Fragment>
      <div className="header">
        <Header {...props}/>
      </div>
      <div>
        {props.children}
      </div>
      <div>
        <Footer />
      </div>  
    </React.Fragment> 
  );
};

export default MainLayout;