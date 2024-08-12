import { createSlice } from "@reduxjs/toolkit";
import { db } from "../firebase/config";
import { getDocs, deleteDoc, collection, doc } from "firebase/firestore";

const initialState = {
    notes : [],
    loading : true,
    currentNote : {},
    isLoggedIn : false,
    currentUser : "",
}

export const noteSlice = createSlice({
    name : 'note',
    initialState : initialState,
    reducers : {
        fetchNotes : (state, action) => {
            state.loading = false,
            state.notes = action.payload
        },
        deleteNote : (state, action) => {
            state.loading = false;
            state.notes = state.notes.filter((note) => note.id !== action.payload.id);
        },
        addNewNote : (state, action) => {
            state.loading = false;
            state.notes = state.notes.push(action.payload);
        },
        changeCurrentNote : (state, action) => {
            state.currentNote = action.payload;
        },
        toggleIsLoggedIn : (state, action) => {
            state.loading = false;
            state.isLoggedIn = true;
        },
        logoutUser : (state) => {
            state.loading = false;
            state.isLoggedIn = false;
        },
        setCurrentUser : (state, action) => {
            state.currentUser = action.payload;
        }
    }
})
export const {fetchNotes, deleteNote, addNewNote, changeCurrentNote, toggleIsLoggedIn, logoutUser, setCurrentUser} = noteSlice.actions;
export default noteSlice.reducer;

export const getNotes = () => async (dispatch, getState) => {
    try {
        const notesRef = collection(db, "notes");
        const data = await getDocs(notesRef);
        
        const filteredData = data.docs
            .map((doc) => ({ ...doc.data(), id: doc.id }))

        dispatch(fetchNotes(filteredData));
    } catch (error) {
        console.error("Error fetching notes:", error);
    }
};

export const removeNote = (id) => async (dispatch) => {
    try {
        console.log(id);
        dispatch(deleteNote(id))
        const noteDoc = doc(db, "notes", id.id);
        await deleteDoc(noteDoc);
    } catch (error) {
        console.error(error);
    }
}