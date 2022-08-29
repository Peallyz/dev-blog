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
                    <NavLink to="/">Feed</NavLink>
                </li>
                <li>
                    <NavLink to="/about">A propos</NavLink>
                </li>
                <li>
                    <NavLink to="/posts">Mes posts</NavLink>
                </li>
                <li>
                    <NavLink to="/bookmark">Favories</NavLink>
                </li>
                <li>
                    <button
                        onClick={() => {
                            handleLogout();
                        }}
                    >
                        Déconnexion
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
