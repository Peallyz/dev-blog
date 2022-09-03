import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { auth } from "../utils/firebase.config";

const NavBar = () => {
    const [navOpened, setNavOpened] = useState(false);
    const handleLogout = async () => {
        await signOut(auth);
        window.location.reload();
    };
    return (
        <nav>
            <button
                className="menu"
                onClick={() => {
                    setNavOpened(!navOpened);
                }}
            >
                <i className="fa-solid fa-bars disabled"></i>
            </button>
            <ul className={navOpened ? "active" : "disabled"}>
                <li>
                    <NavLink to="/dev-blog">Feed</NavLink>
                </li>
                <li>
                    <NavLink to="/dev-blog/about" className={"pages"}>
                        A propos
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dev-blog/posts" className={"pages"}>
                        Mes posts
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dev-blog/bookmark" className={"pages"}>
                        Favories
                    </NavLink>
                </li>
                <li>
                    <button
                        onClick={() => {
                            handleLogout();
                        }}
                    >
                        <NavLink to="/dev-blog">Deconnexion</NavLink>
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
