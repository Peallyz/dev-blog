import React from "react";
import dateFormater from "../utils/dateFormater";

const CommentContainer = ({ comment }) => {
    console.log(comment);
    return (
        <div className="comment__container">
            <div className="comment__container--title">
                <h5>{comment.commentAuthor}</h5>
                <p>Le {dateFormater(comment.date)}</p>
            </div>
            <p>{comment.text}</p>
        </div>
    );
};

export default CommentContainer;
