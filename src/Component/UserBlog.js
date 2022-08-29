import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../utils/firebase.config";
import { useSelector } from "react-redux";

const UserBlog = () => {
    const displayName = useSelector((state) => state.user.displayName);
    const handleLogout = async () => {
        await signOut(auth);
        window.location.reload();
    };
    return (
        <div className="title">
            <h3>Bienvenue {displayName}</h3>
            <button onClick={() => handleLogout()}>
                <i className="fa-solid fa-right-to-bracket"></i>
            </button>
        </div>
    );
};

export default UserBlog;
