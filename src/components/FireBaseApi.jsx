import firebase from "firebase/compat/app";
import { v4 as uuidv4 } from "uuid";
// import "firebase/compat/auth";
import { getFirestore } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { collection, query, where, getDocs, getDoc } from "firebase/firestore";

//*DOC*: https://firebase.google.com/docs/web/modular-upgrade#get_the_version_9_sdk

const firebaseConfig = {
  apiKey: "AIzaSyCWl08_UZcgYk_pXc3cFump79S5qPPLLF8",
  authDomain: "opennote-908da.firebaseapp.com",
  databaseURL: "https://opennote-908da-default-rtdb.firebaseio.com",
  projectId: "opennote-908da",
  storageBucket: "opennote-908da.appspot.com",
  messagingSenderId: "183178810366",
  appId: "1:183178810366:web:71c68429b158795d8666af",
  measurementId: "G-JB6RED2WK3",
};

firebase.initializeApp(firebaseConfig);

//GoogleSignIn
import { signInWithRedirect, GoogleAuthProvider } from "firebase/auth";

export function GoogleSignIn() {
  const googleProvider = new GoogleAuthProvider();

  googleProvider.addScope("https://www.googleapis.com/auth/contacts.readonly");

  googleProvider.setCustomParameters({
    login_hint: "user@example.com",
  });

  const auth = getAuth();
  return new Promise((resolve, reject) => {
    signInWithRedirect(auth, googleProvider)
      .then((result) => {
        console.log("user signin with google");
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export const getCurrentUser = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    return user;
  } else if (user !== null) {
    return user;
  }
};

import { signOut } from "firebase/auth";

export function SignOut(callback) {
  const auth = getAuth();
  return new Promise((resovle, reject) => {
    signOut(auth)
      .then(() => {
        console.log("user sign out");
        resovle();
      })
      .catch((error) => {
        console.log(error);
        reject();
      });
  });
}

export function isSignInChecker() {
  const auth = getAuth();
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve("user sign in");
      } else {
        reject("user is not sign in");
      }
    });
  });
}

const db = getFirestore();

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
  //* fix
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
import { updateDoc, serverTimestamp } from "firebase/firestore";

export function UpdateNote(note) {
  //* note paragraph include
  // title
  // paragraph
  return new Promise(async (resolve, reject) => {
    const notesRef = doc(db, "notes", note.noteid);
    try {
      await updateDoc(notesRef, {
        title: note.title,
        createdAt: serverTimestamp(),
        paragraph: JSON.stringify(note.paragraph),
      });
      console.log("Document successfully Updated!");
      resolve();
    } catch (error) {
      console.error("Error writing document: ", error);
    }
  });
}

//*DOC*: https://firebase.google.com/docs/firestore/query-data/get-data *
export async function getData_From_DataBase() {
  const auth = getAuth();
  const notelist = [];
  if (getCurrentUser() === null || undefined) return;
  return new Promise(async (resolve, reject) => {
    const q = query(
      collection(db, "notes"),
      where("userId", "==", getCurrentUser().uid)
    );
    const querySnapshot = await getDocs(q);
    await querySnapshot.forEach((doc) => {
      notelist.push(doc.data());
    });
    resolve(notelist);
  });
}

export async function Delete_Note(noteid) {
  await deleteDoc(doc(db, "notes", noteid))
    .then(() => console.log("Sucessfull Delete" + noteid))
    .catch((err) => console.log(err));
}

import { includes, indexOf } from "lodash";

export function isThisNoteCreated(note) {
  return includes(note, note.noteid);
}

export async function SignInWithEmail(email, password) {
  const auth = getAuth();
  return new Promise((resolve, reject) =>
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        resolve("user-signin");
      })
      .catch((error) => {
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
