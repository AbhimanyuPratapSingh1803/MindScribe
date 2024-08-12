import { signInWithPopup, GoogleAuthProvider, signOut, setPersistence, browserLocalPersistence, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from './config.js';

const provider = new GoogleAuthProvider();

export const signUpwithEmail = async ({email,password}) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error(error);
    }
}

export const signInwithEmail = async ({email, password}) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error(error);
    }
}

export const signInwithGoogle = async () => {
    try {
        await signInWithPopup(auth, provider);
    } catch (error) {
        console.error(error);
    }
}

export const signout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error(error);
    }
}
