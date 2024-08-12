import React, { useEffect, useState } from "react";
import NoteCard from "./NoteCard";
import Avatar from "./Avatar";
import { useDispatch, useSelector } from "react-redux";
import { getNotes, toggleIsLoggedIn, logoutUser, setCurrentUser } from "../utils/noteSlice";
import Controls from "./Controls";
import {auth} from '../firebase/config'
import { onAuthStateChanged } from 'firebase/auth';
import Spinner from '../assets/Spinner'
import { signInwithGoogle} from '../firebase/auth'

const NotesPage = () => {
    const dispatch = useDispatch();
    const { currentUser, isLoggedIn, notes, loading } = useSelector((state) => state.notes);

    const googleSignIn = async () => {
        try {
            const user = await signInwithGoogle();
            if(user){
                dispatch(toggleIsLoggedIn());
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(toggleIsLoggedIn());
                dispatch(setCurrentUser(user));
            } else {
                dispatch(logoutUser());
            }
            
        });

        return () => unsubscribe();
    }, [dispatch]);

    useEffect(() => {
        dispatch(getNotes());
    }, [dispatch]);

    if(loading){
        return(
            <div className="w-screen h-screen display flex items-center justify-center">
                <Spinner size="100px"/>
            </div>
            
        )
    }

    if (!isLoggedIn)
        return (
            // Sign in section
            <div className="flex size-full h-screen items-center justify-center">
                <div className="h-2/5 w-3/4 sm:w-1/2 flex flex-col-reverse xl:flex-row justify-center items-center gap-3 bg-gradient-to-r from-indigo-500 from-10% to-pink-500 p-3 rounded-xl">
                    <div className="w-3/5 px-2 flex flex-col gap-3 items-center">
                        <h1 className="text-2xl sm:text-3xl font-bold font-inter">Sign In</h1>
                        <button className="btn w-60 sm:w-72 shadow-lg shadow-gray-800 text-black border-none outline-none hover:bg-yellow-300 bg-white"
                            onClick={googleSignIn}
                        >
                            <svg className="mx-2" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="black" viewBox="0 0 488 512"><path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/></svg>
                            Login with Google
                        </button>
                    </div>
                    <div className="divider divider-warning px-4"></div>
                    <div className="w-1/2 flex gap-3 justify-center items-center">
                        <img className="w-10" src="src/assets/Note.svg" alt="" />
                        <h1 className="text-3xl md:5xl pr-5 font-extrabold">MindScribe</h1>
                    </div>
                </div>
            </div>
        );

    return (
        <div>
            <Avatar />
            <Controls />
            {notes.map((note) => {
                if(note.userId == currentUser.uid){
                    return <NoteCard key={note.id} note={note} />
                }
            })}
        </div>
    );
};

export default NotesPage;
