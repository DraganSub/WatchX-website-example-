import app from "firebase/app";
import "firebase/database";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDq6ctSSRQiqLCqPPFfbC6QryKxHPXWfyE",
  authDomain: "webshop-dff92.firebaseapp.com",
  databaseURL:
    "https://webshop-dff92-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "webshop-dff92",
  storageBucket: "webshop-dff92.appspot.com",
  messagingSenderId: "875596472518",
  appId: "1:875596472518:web:943e3e5ce9049f829337c7",
  measurementId: "G-V8NZ70KE59",
};
app.initializeApp(firebaseConfig);

class FirebaseService {
  constructor() {
    this.auth = app.auth();
    this.db = app.database();
    this.serverValue = app.database.ServerValue;
    this.emailAuthProvider = app.auth.EmailAuthProvider;
    this.googleProvider = new app.auth.GoogleAuthProvider().setCustomParameters(
      { prompt: "select_account" }
    );
  }

  // firebase database refs
  cart = () => this.db.ref("cart");
  cartItem = (uid, productId) => this.db.ref(`cart/${uid}/${productId}`);

  user = (uid) => this.db.ref(`users/${uid}`);
  users = () => this.db.ref("users");

  product = (uid) => this.db.ref(`products/${uid}`);
  products = () => this.db.ref("products");

  //firebase sign in methods
  doSignOut = () => this.auth.signOut();

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        this.user(authUser.uid)
          .once("value")
          .then((snapshot) => {
            const dbUser = snapshot.val();
            //merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };
            next(authUser);
          });
      } else {
        fallback();
      }
    });
}

export default FirebaseService;
