import { action, makeObservable, observable } from "mobx";
import SignUpService from "../../Common/services/signUpService";

class SignUpStore{
  constructor(){
    this.signUpService = new SignUpService();
    makeObservable(this,{
      username:observable,
      passwordOne: observable,
      email:observable,
      passwordTwo:observable,
      setUsername:action,
      setPasswordOne:action,
      setPasswordTwo:action,
      setEmail:action,
      onSubmit:action
    });
  }

  // user sign up observables 

  username = "";
  passwordOne="";
  passwordTwo="";
  email="";

  // user sign up methods
  setUsername = event => {
    this.username = event.target.value;
  };

  setPasswordOne = event => {
    this.passwordOne = event.target.value;
  };

  setPasswordTwo = event => {
    this.passwordTwo = event.target.value;
  };

  setEmail = event => {
    this.email = event.target.value;
  };


  onSubmit = (event) => {
    this.signUpService.onSubmit(event, this.username ,this.email, this.passwordOne);
  };
    

}

export default SignUpStore;