import React, { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";

const ConnectModal = () => {
    const [login, setLogin] = useState(true);

    return (
        <div className="modal__connect">
            {login ? <Login /> : <SignUp />}
            <button
                className="btn__connect"
                onClick={() => {
                    setLogin(!login);
                }}
            >
                {login
                    ? "Créer un compte"
                    : "Se connecter à un compte existant"}
            </button>
        </div>
    );
};

export default ConnectModal;
