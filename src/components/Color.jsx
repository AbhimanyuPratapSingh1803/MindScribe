import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchNotes } from "../utils/noteSlice";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";

const Color = ({ color }) => {
    const { currentNote, notes } = useSelector((state) => state.notes);
    const dispatch = useDispatch();

    const changeColor = async () => {
        try {
            const currentNoteIndex = notes.findIndex(
                (note) => note.id === currentNote.id
            );

            const updatedNote = {
                ...notes[currentNoteIndex],
                colors: JSON.stringify(color),
            };

            const newNotes = [...notes];
            newNotes[currentNoteIndex] = updatedNote;
            dispatch(fetchNotes(newNotes));
            console.log(currentNote);
            console.log(typeof currentNote.id);
            console.log(currentNote.id);
            const noteDoc = doc(db, "notes", currentNote.id);
            await updateDoc(noteDoc, { colors: JSON.stringify(color) });
        } catch (error) {
            console.error("You must select a note before changing color!!");
        }
    };

    return (
        // <div
        //     onClick={changeColor}
        //     className="color bg-gray-500 size-10 rounded-full cursor-pointer hover:size-11 duration-200"
        //     style={{ backgroundColor: color.colorHeader }}
        // >
        // </div>
        <div className="tooltip" data-tip={color.id} onClick={changeColor}>
            <button className="btn bg-gray-500 size-12 rounded-full cursor-pointer hover:size-13 duration-200"
                style={{ backgroundColor: color.colorHeader }}
            ></button>
        </div>
    );
};

export default Color;
