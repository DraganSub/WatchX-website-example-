import FirebaseService from "./firebaseService";

class SignUpService {
  constructor() {
    this.firebaseService = new FirebaseService();
  }

  onSubmit = (event, username, email, password, isAdmin = false) => {
    this.firebaseService
      .doCreateUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        const uid = authUser.user.uid;
        return this.firebaseService.user(uid).set({
          uid: authUser.user.uid,
          username,
          email,
          isAdmin,
        });
      });
    event.preventDefault();
  };
}

export default SignUpService;
