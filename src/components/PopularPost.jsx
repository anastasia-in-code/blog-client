import React from "react";
import { Link } from "react-router-dom";

export const PopularPost = ({post}) => {
  return (
    <div className="bg-gray-600 my-1">
      <Link to ={post._id} className="flex p-2 text-xs text-gay-300 hover:bg-gray-800 hover:text-white">
         {post.title}
      </Link>
    </div>
  );
};