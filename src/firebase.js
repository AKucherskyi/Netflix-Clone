import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword  } from "firebase/auth";
import { getFirestore, collection, addDoc , query, where, getDocs} from "firebase/firestore";


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
    console.log(error)
  });
  };

  const createUser = (name, email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    const docRef = addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  })
  .catch((error) => {
    console.log(error)
  });
}

  const logout = () => {
    auth.signOut();
  };

  const fetchUserName = async (user) => {
    try {
      let name = ''
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const querySnap = await getDocs(q);
      querySnap.forEach((doc) => {
       name =  doc.data().name
      })
      return name
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  export {
    auth,
    db,
    login,
    logout,
    createUser,
    fetchUserName
  };