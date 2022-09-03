import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../utils/firebase.config";
import Delete from "./Delete";
import dateFormater from "../utils/dateFormater";
import Comments from "./Comment";
import Bookmarked from "./Bookmarked";

const Post = ({ post }) => {
    const [hasLink, setHasLink] = useState(false);
    const [isAuthor, setIsAuthor] = useState();
    const [isEditing, setIsEditing] = useState(false);
    const [editMess, setEditMess] = useState(null);
    console.log(post);

    const uid = useSelector((state) => state.user.uid);

    const handleEdit = () => {
        setIsEditing(false);
        if (editMess) {
            updateDoc(doc(db, "posts", post.id), { message: editMess });
        }
    };

    useEffect(() => {
        if (post.lien !== "") {
            setHasLink(true);
        }

        if (uid === post.authorId) {
            setIsAuthor(true);
        }
    }, [post.authorId, post.lien, uid]);

    return (
        <div className="post">
            <div className="post__btn">
                <Bookmarked post={post} />
                {isAuthor && uid === post.authorId && (
                    <>
                        <button
                            onClick={() =>
                                isEditing
                                    ? handleEdit()
                                    : setIsEditing(!isEditing)
                            }
                        >
                            <i className="fa-solid fa-pen-to-square"></i>
                        </button>

                        <Delete postId={post.id} />
                    </>
                )}
            </div>
            <h3>{post.title}</h3>
            {isEditing ? (
                <>
                    <textarea
                        autoFocus
                        minLength={10}
                        maxLength={500}
                        value={editMess ? editMess : post.message}
                        onChange={(e) => setEditMess(e.target.value)}
                    ></textarea>

                    <button
                        className="regularBtn modifierBtn"
                        onClick={() => handleEdit()}
                    >
                        Modifier le poste
                    </button>
                </>
            ) : (
                <p className="post__message">
                    {editMess ? editMess : post.message}
                </p>
            )}
            {hasLink && (
                <a href={post.lien} className={"post__link"}>
                    {"Lien cliquable : " + post.lien.slice(0, 100)}
                </a>
            )}
            <div className="post__footer">
                <p>Ecrit par {post.author}</p>
                <p>Le {dateFormater(post.date)}</p>
            </div>
            <Comments post={post} />
        </div>
    );
};

export default Post;
