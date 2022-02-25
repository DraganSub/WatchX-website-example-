import FirebaseService from "./firebaseService";

class SignInService {
  constructor() {
    this.firebaseService = new FirebaseService();
  }

  onSubmit = (e, email, password) => {
    const em = email;
    const pass = password;
    this.firebaseService.doSignInWithEmailAndPassword(em, pass);
    e.preventDefault();
  };

  onSubmitGoogleForm = (event, isAdmin = false) => {
    this.firebaseService.doSignInWithGoogle().then((socialAuthUser) => {
      return this.firebaseService.user(socialAuthUser.user.uid).set({
        uid: socialAuthUser.user.uid,
        username: socialAuthUser.user.displayName,
        email: socialAuthUser.user.email,
        isAdmin: isAdmin,
      });
    });
    event.preventDefault();
  };
}

export default SignInService;
