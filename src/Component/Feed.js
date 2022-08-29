import React from "react";
import CreatePost from "./CreatePost";
import { useSelector } from "react-redux";
import Post from "./Post";

const Feed = () => {
    const posts = useSelector((state) => state.posts.posts);

    return (
        <div className="feed">
            <CreatePost />
            {posts.length > 0 &&
                [...posts]
                    .sort((a, b) => b.date - a.date)
                    .map((post, index) => <Post post={post} key={index} />)}
        </div>
    );
};

export default Feed;
