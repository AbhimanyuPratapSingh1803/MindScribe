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
        <div className="dropdown dropdown-end absolute top-8 right-8 z-[1000]">
            <div tabIndex={0} role="button" className="avatar">
                <div className="fixed cursor-pointer top-8 right-8 ring-purple-400 ring-offset-base-100 w-10 rounded-full ring">
                    <img src={currentUser.photoURL} />
                </div>
            </div>
            <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 mt-6 rounded-box z-[1] w-52 p-2 shadow">
                <li>
                    <div>
                        <button>{currentUser.displayName}</button>
                    </div>
                </li>
                <li>
                    <div onClick={handleLogout}>
                        <button>Logout</button>
                        <img className="size-4" src="./src/assets/logout.svg" alt="" />
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default Avatar;
