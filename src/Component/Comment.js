import { doc, updateDoc } from "firebase/firestore";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../features/post.slice";
import { db } from "../utils/firebase.config";
import CommentContainer from "./CommentContainer";

const Comments = ({ post }) => {
    const commentaire = useRef();
    const displayName = useSelector((state) => state.user.displayName);
    const dispatch = useDispatch();

    const handleComment = (e) => {
        e.preventDefault();

        let data = [];

        if (post.comments !== null) {
            data = [
                ...post.comments,
                {
                    commentAuthor: displayName,
                    text: commentaire.current.value,
                    date: Date.now(),
                },
            ];
        } else {
            data = [
                {
                    commentAuthor: displayName,
                    text: commentaire.current.value,
                    date: Date.now(),
                },
            ];
        }
        updateDoc(doc(db, "posts", post.id), {
            comments: data,
        }).then(() => dispatch(addComment([post.id, data])));
        commentaire.current.value = "";
    };
    return (
        <div className="post__comment">
            <div className="commentaires">
                <h4>Commentaires</h4>
                {post.comments !== null &&
                    post.comments.map((comment) => (
                        <CommentContainer
                            comment={comment}
                            key={Math.floor(Math.random() * 12000)}
                        />
                    ))}
            </div>
            <form className="post__comment--box">
                <textarea
                    minLength={5}
                    maxLength={500}
                    placeholder={"Votre commentaire..."}
                    ref={commentaire}
                ></textarea>
                <button
                    className="regularBtn"
                    onClick={(e) => handleComment(e)}
                >
                    Envoyer
                </button>
            </form>
        </div>
    );
};

export default Comments;
