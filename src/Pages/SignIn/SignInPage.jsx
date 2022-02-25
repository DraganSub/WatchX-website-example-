import { inject, observer } from "mobx-react";
import React from "react";
import Button from "../../Components/Button";
import FormInput from "../../Components/FormInput";
import SignInStore from "./SignInStore";
import "./styles.scss";

class SignInPage extends React.Component{
  render(){
    const email = this.props.signInStore.email;
    const password = this.props.signInStore.password;
    const isInvalid = password === "" || email === "";
    return(
      <section className="signIn-page">
        <h1>Sign In Page</h1>
        <div className="sign-wrap">
          <form onSubmit={(e) => this.props.signInStore.onSubmit(e)}>
            <FormInput 
              name="email"
              handleChange={e => this.props.signInStore.setEmail(e)}
              type="text"
              value={email}
              placeholder="Email Address"
              label="Username"
            />
            <FormInput 
              name="password"
              handleChange={e => this.props.signInStore.setPassword(e)}
              type="password"
              value={password}
              placeholder="Password"
              label="Password"
            />
            <div className="btn-position-mid">
              <Button disabled={isInvalid} type="submit">
                Sign In
              </Button>
            </div>      
          </form>

          <form className="googleForm" onSubmit={(e) => this.props.signInStore.onSubmitGoogleForm(e)}>
            <div className="btn-position-mid">
              <div className="or">
                or 
              </div>
              <Button type="submit" disabled={isInvalid}>
                Sign In with Google
              </Button>
            </div>
          </form>
        </div>
      </section>      
    );
  }
}

export default inject(rootStore => ({
  signInStore: new  SignInStore(rootStore)
}))(observer(SignInPage));