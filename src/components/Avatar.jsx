import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { signout } from "../firebase/auth";
import { logoutUser } from "../utils/noteSlice";


const Avatar = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.notes);
    const handleLogout = async () => {
        try {
            await signout();
            dispatch(logoutUser());
            console.log("Logged out");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="dropdown dropdown-end absolute top-8 right-1 z-[1000]">
            <div tabIndex={0} role="button" className="avatar">
                <div className="fixed cursor-pointer top-8 right-8 ring-purple-400 ring-offset-base-100 w-10 rounded-full ring">
                    <img src={currentUser.photoURL} />
                </div>
            </div>
            <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 mt-6 rounded-box z-[1] w-32 p-2 shadow">
                <li>
                    <div>
                        <button>{currentUser.displayName}</button>
                    </div>
                </li>
                <li>
                    <div onClick={handleLogout}>
                        <button>Logout</button>
                        <svg className="size-4" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default Avatar;
