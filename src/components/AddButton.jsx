import React from "react";
import Plus from "../assets/Plus";
import { db } from "../firebase/config";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import colors from '../assets/colors.json'
import { useDispatch, useSelector } from "react-redux";
import { useRef, useEffect } from "react";
import { getNotes } from "../utils/noteSlice";

const AddButton = () => {
    const startingPos = useRef(10);
    const dispatch = useDispatch();
    const {notes, currentUser} = useSelector((state) => state.notes);

    const addNote = async () => {
        const notesRef = collection(db, "notes")
        await addDoc(notesRef, {
            body : "",
            positions : JSON.stringify({x : startingPos.current, y : startingPos.current}),
            colors : JSON.stringify(colors[0]),
            userId : currentUser.uid,
        });
        startingPos.current += 10;
        dispatch(getNotes());
    }

    return (
        // <div onClick={addNote} className="add-btn bg-[rgba(107, 107, 107, 1)] flex justify-center items-center size-10 rounded-full cursor-pointer hover:size-11 duration-200">
        //     <Plus />
        // </div>
        <div className="tooltip" data-tip="Add Note" onClick={addNote}>
            <button className="flex bg-slate-700 h-8 w-8 sm:size-14 justify-center items-center rounded-full cursor-pointer hover:size-13 duration-200">
                <Plus size=""/>
            </button>
        </div>
    );
};

export default AddButton;
