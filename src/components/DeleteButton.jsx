import React from "react";
import Trash from "../assets/Trash";
import { useDispatch} from "react-redux";
import { removeNote } from "../utils/noteSlice";

const DeleteButton = (id) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        console.log("clicked delete")
        dispatch(removeNote(id));
    };

    return (
        <div onClick={handleDelete}>
            <Trash />
        </div>
    );
};

export default DeleteButton;
