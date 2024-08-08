import { initializeApp } from "firebase/app";
import { 
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";

import {getFirestore, doc, getDoc, setDoc} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC3al612IIHQYNrDISf7phCj_cN8WVbjqU",
    authDomain: "crown-clothing-db-a9dff.firebaseapp.com",
    projectId: "crown-clothing-db-a9dff",
    storageBucket: "crown-clothing-db-a9dff.appspot.com",
    messagingSenderId: "811355923107",
    appId: "1:811355923107:web:79cc698e4dc80cbc439516"
};
  
const firebaseApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth, additonalInformation={}) => {
    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSanpshot = await getDoc(userDocRef);
    if(!userSanpshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additonalInformation
            })
        } catch (error) {
            console.log('error creating the user: ', error);
        }
    }

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}

