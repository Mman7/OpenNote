import firebase from "firebase/compat/app";
import { v4 as uuidv4 } from "uuid";
import "firebase/compat/auth";
import "firebase/compat/firestore";

//*DOC*: https://firebase.google.com/docs/web/modular-upgrade#get_the_version_9_sdk
//TODO : Get Firebase api with fetch

const firebaseConfig = {
  apiKey: "AIzaSyCWl08_UZcgYk_pXc3cFump79S5qPPLLF8",
  authDomain: "opennote.webapp.com",
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
export function GoogleSignIn(changeState) {
  firebase
    .auth()
    .signInWithRedirect(googleProvider)
    .then((user) => {
      changeState(true);
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

export async function SaveNote_To_DataBase(note) {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (isThisNoteCreated(note)) {
        UpdateNote(note).then(() => resolve());
      } else {
        newNote(note).then(() => resolve());
      }
    });
  });
}

export function newNote(note) {
  //* note param must include
  // title
  // paragraph
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      const newUid = uuidv4();
      db.collection("notes")
        .doc(newUid)
        .set({
          noteid: newUid,
          email: user?.email,
          userId: user.uid,
          title: note.title ?? "New Document",
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          //paragraph if could best is delta object
          paragraph: JSON.stringify(note.paragraph),
        })
        .then(() => {
          console.log("Document successfully written!");
          resolve();
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    });
  });
}
export function UpdateNote(note) {
  //* note paragraph include
  // title
  // paragraph
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      db.collection("notes")
        .doc(note.noteid)
        .update({
          title: note.title,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          paragraph: JSON.stringify(note.paragraph),
        })
        .then(() => {
          console.log("Document successfully Updated!");
          resolve();
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    });
  });
}

import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs, getDoc } from "firebase/firestore";
import { isEmpty } from "lodash";

export async function getData_From_DataBase() {
  const auth = getAuth();
  const notelist = [];
  return new Promise(
    async (resolve, reject) =>
      await onAuthStateChanged(auth, async (user) => {
        if (user) {
          const q = query(
            collection(db, "notes"),
            where("userId", "==", user.uid)
          );
          const querySnapshot = await getDocs(q);
          const data = await querySnapshot.forEach(async (doc) => {
            notelist.push(doc.data());
          });
        } else {
          return;
        }
        resolve(notelist);
      })
  );
}

import { doc, deleteDoc } from "firebase/firestore";

export async function Delete_Note(noteid) {
  await deleteDoc(doc(db, "notes", noteid))
    .then(() => console.log("Sucessfull Delete" + noteid))
    .catch((err) => console.log(err));
}

import { includes } from "lodash";
export function isThisNoteCreated(note) {
  return includes(note, note.noteid);
}
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export async function SignInWithEmail(email, password) {
  const auth = getAuth();
  return new Promise((resolve, reject) =>
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        resolve("user-signin");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        reject(error);
      })
  );
}

import { createUserWithEmailAndPassword } from "firebase/auth";

export async function createAccountWithEmail(email, password) {
  const auth = getAuth();
  return new Promise((resolve, reject) =>
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        resolve();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        reject(error);
      })
  );
}
