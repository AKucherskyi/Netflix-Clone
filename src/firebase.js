import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword  } from "firebase/auth";
import { getFirestore, getDoc, setDoc, doc, updateDoc, increment} from "firebase/firestore";


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
    console.log(userCredential)
  })
  .catch((error) => {
    alert(error.message)
  });
  };

  const createUser = (name, email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      liked: [],
      favorites: [],
      friends:[]

    });
  })
  .catch((error) => {
    alert(error.message)
  });
}

  const logout = () => {
    auth.signOut();
  };

  const fetchUser = async (user) => {
    try {
     const userSnap = await getDoc(doc(db, "users" , user?.uid))
     return userSnap.data()
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  const getLikes = async (id) => {
    const likes = await getDoc(doc(db, "movies", id.toString()));
    if (!likes.data()) {
      const setLikes = Math.ceil(Math.random() * 1000);
      await setDoc(doc(db, "movies", id.toString()), {
        id: parseInt(id),
        likes: setLikes,
      });
      return setLikes;
    }
    return likes.data()?.likes;
  };

  const incLikes = async (id) => {
    const movieRef = doc(db, "movies", id.toString())
    await updateDoc(movieRef, {
      likes : increment(1)
    })
    console.log('+')
  }

  const decLikes = async (id) => {
    const movieRef = doc(db, "movies", id.toString())
    await updateDoc(movieRef, {
      likes : increment(-1)
    })
  }
  
  const updateUser = async (uid, obj) => {
    const userRef = doc(db, "users", uid)
    await updateDoc(userRef, obj);
  }

  export {
    auth,
    db,
    login,
    logout,
    createUser,
    fetchUser,
    getLikes,
    updateUser,
    incLikes,
    decLikes
  };