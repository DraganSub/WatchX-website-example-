import { action, makeObservable, observable} from "mobx";
import FirebaseService from "../Common/services/firebaseService";


class SessionStore{
  constructor(){  
    this.firebaseService = new FirebaseService();
    makeObservable(this, {
      authUser:observable,
      setAuthUser:action
    });

    this.listener = this.firebaseService.onAuthUserListener(
      authUser => {
        localStorage.setItem("authUser", JSON.stringify(authUser));
        this.setAuthUser(authUser);
      },
      () => {
        localStorage.removeItem("authUser");
        this.setAuthUser(null);
      },
    );
  }

  //observable authUser
    
  authUser = null;

  //session methods

  setAuthUser = authUser => {
    this.authUser = authUser;
  };

  doSignOut = () =>{
    this.authUser = null;
  };
    
}

export default SessionStore;