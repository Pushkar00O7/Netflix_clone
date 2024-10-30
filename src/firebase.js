import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCMecP9-JXWDF2OPaP07Tcw4TRMMvROv4s",
  authDomain: "netflix-c784e.firebaseapp.com",
  projectId: "netflix-c784e",
  storageBucket: "netflix-c784e.appspot.com",
  messagingSenderId: "377745095470",
  appId: "1:377745095470:web:47d71a44f4994ab40e18bf"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async(name,email,password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user=res.user;
        await addDoc(collection(db,"user"),{
            uid:user.uid,
            name,
            authprovider:"local",
            email,

        })
    }catch(error){
        console.log(error);
        alert(error);
    }
    
}

const login=async (email, password)=>{
    try{
        const res = await signInWithEmailAndPassword(auth, email, password);
        return res.user;
    }catch(error){
        console.log(error);
        alert(error);
    }

}

const logout = async () => {
    try {
        await signOut(auth);
        console.log("User signed out successfully.");
    } catch (error) {
        console.log("Sign-out error:", error);
        alert("Sign-out failed: " + error.message);
    }
}

export {auth,db,login,signup,logout};

