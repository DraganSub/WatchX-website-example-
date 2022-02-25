import React from "react";
import Navigation from "./Navigation";

const  Header = (props) =>{
  return (
    <div>
      <Navigation {...props}/>
    </div>
  );
};

export default Header;
