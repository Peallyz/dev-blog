import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../features/post.slice";
import { db } from "../utils/firebase.config";

const Delete = ({ postId }) => {
    const dispatch = useDispatch();
    const handleDelete = () => {
        deleteDoc(doc(db, "posts", postId)).then(() =>
            dispatch(deletePost(postId))
        );
    };

    return (
        <button onClick={() => handleDelete()}>
            <i className="fa-regular fa-trash-can"></i>
        </button>
    );
};

export default Delete;
