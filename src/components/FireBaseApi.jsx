import firebase from "firebase/compat/app";

import "firebase/compat/auth";
import "firebase/compat/firestore";

//*DOC*: https://firebase.google.com/docs/web/modular-upgrade#get_the_version_9_sdk

const firebaseConfig = {
  apiKey: "AIzaSyCWl08_UZcgYk_pXc3cFump79S5qPPLLF8",
  authDomain: "opennote-908da.firebaseapp.com",
  projectId: "opennote-908da",
  storageBucket: "opennote-908da.appspot.com",
  messagingSenderId: "183178810366",
  appId: "1:183178810366:web:ea9e2a5b95e8f74d8666af",
  measurementId: "G-Q79CKY84BC",
};

firebase.initializeApp(firebaseConfig);

var googleProvider = new firebase.auth.GoogleAuthProvider();

googleProvider.addScope("https://www.googleapis.com/auth/contacts.readonly");

googleProvider.setCustomParameters({
  login_hint: "user@example.com",
});

firebase.auth().useDeviceLanguage();

//GoogleSignIn
export function GoogleSignIn(callback) {
  firebase
    .auth()
    .signInWithRedirect(googleProvider)
    .then((user) => {
      callback(true);
      console.log(user);
    });
}

export const getCurrentUser = () => {
  const currentUser = firebase.auth().currentUser;
  if (currentUser !== null) {
    // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
    return currentUser;
  }
};

export function SignOut(callback) {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("Sign-out successful");
      //setIsLogin to false
      callback(false);
    })
    .catch((error) => {
      console.log(`An ${error} happened.`);
    });
}

export function isSignInChecker(callback) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("user is login");
      callback(true);
    } else {
      console.log("user not login");
    }
  });
}

const db = firebase.firestore();

export function SaveNote_To_DataBase(note) {
  console.log(note);
  firebase.auth().onAuthStateChanged((user) => {
    if (user === undefined || null) return;
    const { email, userId } = note;
    if (email || userId === undefined || null) return;
    db.collection("users")
      .doc(note.title)
      .set({
        email: note.email,
        userId: note.userId,
        title: note.title || "New Document",
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        paragraph: note.paragraph ?? "Insert some text",
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  });
}

//TODO : Fix Firebase security rules
//* ONLY USER ITSELF CAN READS THE DATA

export function getData_From_DataBase() {
  db.collection("users")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(`${doc.data()}`);
      });
    });
}
