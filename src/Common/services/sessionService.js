import FirebaseService from "./firebaseService";

class SessionService {
  constructor() {
    this.firebaseService = new FirebaseService();
  }

  onSubmitGoogleForm = (event, isAdmin) => {
    this.firebaseService.doSignInWithGoogle().then((socialAuthUser) => {
      return this.firebaseService.user(socialAuthUser.user.uid).set({
        username: socialAuthUser.user.displayName,
        email: socialAuthUser.user.email,
        isAdmin: isAdmin,
      });
    });
    event.preventDefault();
  };

  onSubmit = (event, items) => {
    const { username, passwordOne, email, isAdmin } = items;
    this.firebaseService
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        return this.firebaseService.user(authUser.user.uid).set({
          username,
          email,
          isAdmin,
        });
      });
    event.preventDefault();
  };
}

export default SessionService;
