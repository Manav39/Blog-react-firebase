import { createContext, useContext, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where
} from "firebase/firestore";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyD5quyxrrqDQDAyVH7m-Vnk97B-lEk8KHU",
  authDomain: "blogging-84a15.firebaseapp.com",
  projectId: "blogging-84a15",
  storageBucket: "blogging-84a15.appspot.com",
  messagingSenderId: "432339588124",
  appId: "1:432339588124:web:e9ddab0089e8488d673bd9",
};

export const useFirebase = () => useContext(FirebaseContext);
const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const storage = getStorage(app);
const firestore = getFirestore(app);

export const FirebaseProvider = (props) => {
  const [bdata, setBdata] = useState(null);
  const [user, setUser] = useState(null);
  onAuthStateChanged(firebaseAuth, (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });

  const CreateUser = async (email, password) => {
    await createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then(() => console.log("User Created"))
      .catch((err) => console.log(err));
  };
  const SignInUser = async (email, password) => {
    await signInWithEmailAndPassword(firebaseAuth, email, password)
      .then(() => console.log("User Logged In"))
      .catch((err) => console.log(err));
  };

  const SignInWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, googleProvider)
      .then((data) => console.log("Manav", data, user, isLoggedIn))
      .catch((err) => console.log(err));
  };

  const SignUserOut = async () => {
    await signOut(firebaseAuth).then(() =>
      console.log("hello", user, " ", isLoggedIn, " ", "Logged Out")
    );
  };

  const getImageURL = (path) => {
    return getDownloadURL(ref(storage, path));
  };

  const UploadPost = async (title, content, thumbnail) => {
    const url =
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Fpremium-vector%2Favatar-portrait-young-caucasian-boy-man-round-frame-vector-cartoon-flat-illustration_20793982.htm&psig=AOvVaw2GgQXzVcHQzIRvNn4SF6Ls&ust=1675670857804000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCPiu2cX2_fwCFQAAAAAdAAAAABAD";
    console.log(title, content, thumbnail);
    const thumbnailRef = ref(
      storage,
      `uploads/users/${Date.now()}-${thumbnail.name}`
    );
    const result = await uploadBytes(thumbnailRef, thumbnail);
    return await addDoc(collection(firestore, "blogs"), {
      title,
      content,
      imageURL: result.ref.fullPath,
      userId: user.uid,
      userEmail: user.email,
      displayName: user.displayName === null ? user.email : user.displayName,
      photoURL: user.photoURL === null ? url : user.photoURL,
    });
  };

  const AllBlogs = () => {
    return getDocs(collection(firestore, "blogs"));
  };

  const getBlogById = async (blogId) => {
    const docref = doc(firestore, "blogs", blogId);
    const result = await getDoc(docref);
    console.log("Result : ", result.data());
    // //return result.data();
    setBdata(result.data());
  };


  const getSingleUserBlogs = async(userId) =>{
    console.log(userId)
    const docref = collection(firestore,"blogs")
    const q = query(docref,where("userId",'==',userId))
    const result = await getDocs(q);
    console.log('result',result)
    return result;
  }

  const isLoggedIn = user ? true : false;
  return (
    <FirebaseContext.Provider
      value={{
        CreateUser,
        SignInUser,
        isLoggedIn,
        SignInWithGoogle,
        SignUserOut,
        user,
        UploadPost,
        AllBlogs,
        getImageURL,
        getBlogById,
        bdata,
        getSingleUserBlogs
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
