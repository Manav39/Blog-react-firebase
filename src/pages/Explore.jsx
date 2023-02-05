import React, { useState } from "react";
import { useFirebase } from "../context/Firebase";
import BlogCard from "./BlogCard";
const Explore = () => {
  const firebase = useFirebase();
  const [blogs, setBlogs] = useState([]);
  firebase.AllBlogs().then((blogs) => setBlogs(blogs.docs));
  return (
    <>
      {blogs.map((blog) => {
        return <BlogCard {...blog.data()} key={blog.id} id={blog.id} link={`blog/${blog.id}`}/>;
      })}
    </>
  );
};

export default Explore;
