import firebase from "firebase/compat/app";
import { v4 as uuidv4 } from "uuid";
import "firebase/compat/auth";
import "firebase/compat/firestore";

//*DOC*: https://firebase.google.com/docs/web/modular-upgrade#get_the_version_9_sdk
//TODO : Get Firebase api with fetch

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
    // if (!user) return;

    // if (user.email || user.userId === undefined || null) return;
    const newUid = uuidv4();

    db.collection("users")
      .doc(newUid)
      .set({
        // email: user.email,
        // userId: user.uid,
        // title: note.title || "New Document",
        // createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        // paragraph: note.paragraph ?? "Insert some text",
        noteid: newUid,
        email: "youzai042&@gmail.com",
        userId: user.uid,
        title: "Nihao wojiao heyi",
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        paragraph:
          " Lorem ipsum dolor sit amet consectetur adipisicing elit. Est numquam atque porro consequatur obcaecati ipsum.",
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  });
}

export function NewNote(note) {
  //* note paragraph include
  // title
  // paragraph
  firebase.auth().onAuthStateChanged((user) => {
    const newUid = uuidv4();
    db.collection("users")
      .doc(newUid)
      .set({
        noteid: newUid,
        email: user.email,
        userId: user.uid,
        title: note.title,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        //paragraph if could best is delta object
        paragraph: note.paragraph,
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
//* ONLY USER THEMSELF CAN READS THE DATA

export async function getData_From_DataBase() {
  const notelist = [];

  const data = await new Promise((resolve) => {
    db.collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          notelist.push(doc.data());
          resolve("Get Data Success");
        });
      })
      .catch((err) => console.log(err));
  });
  return notelist;
}
