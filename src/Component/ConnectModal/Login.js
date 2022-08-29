import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useRef, useState } from "react";
import { auth } from "../../utils/firebase.config";

const Login = () => {
    const loginEmail = useRef();
    const loginPassword = useRef();

    const [error, setError] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const user = await signInWithEmailAndPassword(
                auth,
                loginEmail.current.value,
                loginPassword.current.value
            );
            setError(false);
            console.log(user);
        } catch (error) {
            setError(true);
        }
    };

    return (
        <div className="login">
            <h3>Se connecter </h3>
            {error && <p>L'email ou le mot de passe n'est pas valide !</p>}
            <form onSubmit={(e) => handleLogin(e)}>
                <input
                    type="email"
                    placeholder="Votre Email"
                    required
                    ref={loginEmail}
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    required
                    ref={loginPassword}
                />
                <span onClick={(e) => handleLogin(e)}>
                    <input
                        className={"loginBtn"}
                        type="submit"
                        value={"Se connecter"}
                    />
                </span>
            </form>
        </div>
    );
};

export default Login;
