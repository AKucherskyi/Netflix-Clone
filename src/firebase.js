import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB4lJKTDljcFUCBJai517R2tWJX2LoTe_I",
    authDomain: "netflix-like-app-cd98d.firebaseapp.com",
    projectId: "netflix-like-app-cd98d",
    storageBucket: "netflix-like-app-cd98d.appspot.com",
    messagingSenderId: "838403607857",
    appId: "1:838403607857:web:7a98a28cf45796e2d4f410",
    measurementId: "G-575ZNWZKFD"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth()
const db = getFirestore();

const login = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  };

  // const registerWithEmailAndPassword = async (name, email, password) => {
  //   try {
  //     const res = await auth.createUserWithEmailAndPassword(email, password);
  //     const user = res.user;
  //     await db.collection("users").add({
  //       uid: user.uid,
  //       name,
  //       authProvider: "local",
  //       email,
  //     });
  //   } catch (err) {
  //     console.error(err);
  //     alert(err.message);
  //   }
  // };

 

  const logout = () => {
    auth.signOut();
  };

  export {
    auth,
    db,
    login,
    logout
  };