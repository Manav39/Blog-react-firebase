import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import BlogCard from "./BlogCard";
const YourBlogs = () => {
  const firebase = useFirebase();
  const [blogData, setBlogData] = useState([]);
  useEffect(() => {
    firebase
      .getSingleUserBlogs(firebase?.user?.uid)
      .then((blogs) => setBlogData(blogs.docs));
  }, []);
  console.log(blogData);
  return (
    <div>
      {blogData.map((blog) => (
        <BlogCard key={blog.id} id={blog.id} {...blog?.data()} link={`/yourblogs/blog/${blog.id}`} />
      ))}
    </div>
  );
};

export default YourBlogs;
