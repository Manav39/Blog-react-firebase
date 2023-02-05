import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import "./BlogCard.css";
const BlogCard = (props) => {
  const firebase = useFirebase();
  const [url, setUrl] = useState(null);
  const navigate = useNavigate();
  const text = props.content;
  useEffect(() => {
    firebase.getImageURL(props.imageURL).then((url) => setUrl(url));
  }, []);
  return (
    <div id="container">
      <div className="product-details">
        <center>
          <h1 style={{ marginLeft: "0px", marginBottom: "20px" }}>
            &nbsp;{props.title}
          </h1>
        </center>

        <p style={{ textAlign: "left" }}>{text.substring(0, 120)}</p>

        <center>
          &nbsp;
          <button
            className="btn"
            style={{ marginTop: "20px" }}
            onClick={() => navigate(props.link)}
          >
            <span className="buy" style={{ bottom: "10px" }}>
              {props.link === `/yourblogs/blog/${props.id}` ? 'View Stats' : 'View'} 
            </span>
          </button>
        </center>
      </div>

      <div className="product-image">
        <img src={url} alt="" style={{ objectFit: "cover" }} />
      </div>
    </div>
  );
};

export default BlogCard;
