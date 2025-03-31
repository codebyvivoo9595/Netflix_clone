// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {addDoc, collection, getFirestore} from "firebase/firestore";
import { toast } from "react-toastify";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzqABBfxxvbCnmZKjBDg2xnL6UQJXVY3I",
  authDomain: "netflix-clone-6d8a9.firebaseapp.com",
  projectId: "netflix-clone-6d8a9",
  storageBucket: "netflix-clone-6d8a9.firebasestorage.app",
  messagingSenderId: "884570884247",
  appId: "1:884570884247:web:303db4a72e32f270e841d2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication 
const auth = getAuth(app);

// Initialize Database
const db = getFirestore(app);

const signup = async (name,email,password)=>{
     try {
        // It will authenticate email & password
       const res = await createUserWithEmailAndPassword(auth,email,password);
       const user = res.user;
       await addDoc(collection(db,"user"),{
        uid:user.uid,
        name,
        authProvider:"local",
        email,
       });
     } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
     }
     
}



const login = async (email,password)=>{
    try {
        signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        console.log(error);
        //toast.error(error.code);
        toast.error(error.code.split('/')[1].split('-').join(' '));


    }
}


const logout = async ()=>{
    signOut(auth);
}

export{auth,db,login,signup,logout}