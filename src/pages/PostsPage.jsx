import React, { useState, useEffect } from "react";
import axios from "../utils/axios";
import { PostItem } from "../components/PostItem";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const fetchMyPosts = async () => {
    try {
      const { data } = await axios.get("/posts/user/me");
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  return (
    <div className="w-1/2 mx-auto py-10 flex flex-col gap-10">
      {posts?.map((post, idx) => {
        if (post !== null) {
          return <PostItem post={post} key={idx} />;
        }
        return null
      })}
    </div>
  );
}
