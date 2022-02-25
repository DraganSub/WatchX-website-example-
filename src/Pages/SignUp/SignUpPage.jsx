import { inject, observer } from "mobx-react";
import React from "react";
import Button from "../../Components/Button";
import FormInput from "../../Components/FormInput";
import SignUpStore from "./SignUpStore";
import "./styles.scss";



class SignUpPage extends React.Component{

  render(){
    const signUpStore = this.props.signUpStore;
    const username = signUpStore.username;
    const email = signUpStore.email;
    const passwordOne = signUpStore.passwordOne;
    const passwordTwo = signUpStore.passwordTwo;
    const isInvalid = passwordOne !== passwordTwo || 
                            passwordOne === "" ||
                            email === "" || 
                            username === "";
    return(
      <section className="signUp-page">
        <h1>Sign Up Page</h1>
        <div className="sign-wrap">
          <form onSubmit={(e) => signUpStore.onSubmit(e)}>
            <FormInput 
              handleChange={(e) => signUpStore.setUsername(e)}
              type="text"
              label="Username"
              placeholder="Full name"
              value={username}
            />
            <FormInput 
              handleChange={(e) => signUpStore.setEmail(e)}
              type="email"
              label="Email"
              placeholder="Email"
              value={email}
            />
            <FormInput 
              handleChange={(e) => signUpStore.setPasswordOne(e)}
              type="password"
              label="Password"
              placeholder="Password"
              value={passwordOne}
            />
            <FormInput 
              handleChange={(e) => signUpStore.setPasswordTwo(e)}
              type="password"
              label="Repeat Password"
              placeholder="Password"
              value={passwordTwo}
            />
            <div className="btn-position-mid">
              <Button disabled={isInvalid} type="submit">
                Sign Up
              </Button>
            </div>
          </form>
        </div>

      </section>
    );
  }
}

export default inject(rootStore => ({
  signUpStore: new SignUpStore (rootStore)
}))(observer(SignUpPage));