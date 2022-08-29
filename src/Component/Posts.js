import React from "react";
import { useSelector } from "react-redux";
import CreatePost from "./CreatePost";
import Post from "./Post";

const Posts = () => {
    const posts = useSelector((state) => state.posts.posts);
    const uid = useSelector((state) => state.user.uid);
    return (
        <div className="posts">
            <CreatePost />
            {posts.length > 0 && posts.some((id) => id.authorId === uid)
                ? [...posts]
                      .filter((post) => post.authorId === uid)
                      .sort((a, b) => b.date - a.date)
                      .map((post, index) => <Post post={post} key={index} />)
                : uid && (
                      <h3 className="zeroPost">
                          Vous n'avez pas encore poster sur ce site.
                      </h3>
                  )}
        </div>
    );
};

export default Posts;
