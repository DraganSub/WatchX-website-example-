import { action, makeObservable, observable, runInAction } from "mobx";
import SignInService from "../../Common/services/signInService";


class SignInStore{
  constructor(){
    this.signInService = new SignInService();
    makeObservable(this,{
      email:observable,
      password:observable,
      isAdmin:observable,
      setEmail:action,
      setPassword:action,
      onSubmitGoogleForm:action,
      onSubmit:action,
    });
  }
  //sign-in observables
  email = "";
  password = "";
  isAdmin = false;


  //sign-in methods
  setEmail = event => {
    this.email = event.target.value;
  };

  setPassword = event => {
    this.password = event.target.value;
  };



  onSubmit = e => {
    runInAction(() => {
      this.signInService.onSubmit(e,this.email,this.password);
    });
  };

  onSubmitGoogleForm = (e) => {
    runInAction(() => {
      this.signInService.onSubmitGoogleForm(e, this.admin);
    });
  };
};

export default SignInStore;