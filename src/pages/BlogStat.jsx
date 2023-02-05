import React from 'react'
import { useParams } from 'react-router-dom'
const BlogStat = () => {
    const params = useParams()
  return (
    <div>{params.blogId}</div>
  )
}

export default BlogStat