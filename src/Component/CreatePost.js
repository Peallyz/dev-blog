import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase.config";
import { addPost, getPosts } from "../features/post.slice";

const CreatePost = () => {
    const [post, setPost] = useState(false);
    const displayName = useSelector((state) => state.user.displayName);
    const uid = useSelector((state) => state.user.uid);
    const title = useRef();
    const message = useRef();
    const lien = useRef();
    const dispatch = useDispatch();

    const handlePost = async (e) => {
        e.preventDefault();
        setPost(false);

        const data = {
            author: displayName,
            authorId: uid,
            title: title.current.value,
            message: message.current.value,
            lien: lien.current.value,
            comments: null,
            date: Date.now(),
            like: [],
        };
        await addDoc(collection(db, "posts"), data).then(() => {
            dispatch(addPost(data));
            getDocs(collection(db, "posts")).then((res) =>
                dispatch(
                    getPosts(
                        res.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
                    )
                )
            );
        });
        title.current.value = "";
        message.current.value = "";
        lien.current.value = "";
    };
    return (
        <div className="createPost">
            <button onClick={() => setPost(!post)}>
                <i className="fa-solid fa-feather"></i>
            </button>
            <form
                className={post ? "isActive" : ""}
                onSubmit={(e) => handlePost(e)}
            >
                <h3>Ecrire un poste</h3>
                <input type="text" placeholder="Titre" ref={title} required />
                <textarea
                    placeholder="Votre poste"
                    ref={message}
                    maxLength="500"
                    required
                ></textarea>
                <input
                    type="text"
                    placeholder="Lien hypertexte (optionnel)"
                    ref={lien}
                />
                <input type="submit" value="Créer le poste" />
            </form>
        </div>
    );
};

export default CreatePost;
