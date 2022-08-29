import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLike } from "../features/post.slice";
import { db } from "../utils/firebase.config";

const Bookmarked = ({ post }) => {
    const [isLike, setIsLike] = useState(false);
    const uid = useSelector((state) => state.user.uid);
    const dispatch = useDispatch();

    useEffect(() => {
        if (post.like === []) {
            setIsLike(false);
        } else if (post.like.includes(uid)) {
            setIsLike(true);
        } else {
            setIsLike(false);
        }
    }, [post.like, uid]);

    const handleLike = () => {
        let data = [];
        if (post.like.some((id) => id === uid)) {
            data = post.like.filter((like) => like !== uid);
        } else {
            data = [...post.like, uid];
        }

        updateDoc(doc(db, "posts", post.id), {
            like: data,
        }).then(() => dispatch(setLike([post.id, data])));
    };

    return (
        <button onClick={() => handleLike()}>
            {isLike ? (
                <i className="fa-solid fa-star"></i>
            ) : (
                <i className="fa-regular fa-star"></i>
            )}
        </button>
    );
};

export default Bookmarked;
