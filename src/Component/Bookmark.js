import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post";

const Bookmark = () => {
    const posts = useSelector((state) => state.posts.posts);
    const uid = useSelector((state) => state.user.uid);
    return (
        <div className="bookmark">
            {posts.length > 0 && posts.some((id) => id.like.includes(uid))
                ? [...posts]
                      .filter((post) => post.like.includes(uid))
                      .sort((a, b) => b.date - a.date)
                      .map((post, index) => <Post post={post} key={index} />)
                : uid && (
                      <h3 className="zeroPost">
                          Vous n'avez pas encore aimé de postes.
                      </h3>
                  )}
        </div>
    );
};

export default Bookmark;
