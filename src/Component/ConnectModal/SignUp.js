import React, { useRef, useState } from "react";
import { auth } from "../../utils/firebase.config";

const SignUp = () => {
    const registerEmail = useRef();
    const registerPassword = useRef();
    const confirmedPassword = useRef();
    const [displayName, setDisplayName] = useState();

    const [error, setError] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault();

        try {
            if (
                registerPassword.current.value ===
                confirmedPassword.current.value
            ) {
                auth.createUserWithEmailAndPassword(
                    registerEmail.current.value,
                    registerPassword.current.value
                ).then(async (userAuth) => {
                    await userAuth.user.updateProfile({
                        displayName,
                    });
                    window.location.reload();
                });
            } else {
                setError(true);
            }
        } catch (error) {
            setError(true);
        }
    };

    return (
        <div className="signUp">
            <h3>S'inscrire </h3>
            {error && <p>L'email ou le mot de passe n'est pas valide !</p>}
            <form onSubmit={(e) => handleRegister(e)}>
                <input
                    type="text"
                    placeholder="Nom de compte"
                    required
                    onChange={(e) => setDisplayName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Votre Email"
                    required
                    ref={registerEmail}
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    required
                    ref={registerPassword}
                />
                <input
                    type="password"
                    placeholder="Confirmer le mot de passe"
                    required
                    ref={confirmedPassword}
                />
                <span onClick={(e) => handleRegister(e)}>
                    <input
                        className="loginBtn"
                        type="submit"
                        value={"Valider inscription"}
                    />
                </span>
            </form>
        </div>
    );
};

export default SignUp;
