import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "../utils/noteSlice";

const store = configureStore({
    reducer: {
        notes: notesReducer,
    },
});

export default store;
