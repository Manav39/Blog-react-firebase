import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { useFirebase } from "../context/Firebase";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
const BlogDetail = () => {
  const firebase = useFirebase();
  const params = useParams();
  const [url, setUrl] = useState(null);
  useEffect(() => {
    firebase.getBlogById(params.blogId);
  }, []);
  useEffect(() => {
    if (firebase.bdata) {
      firebase.getImageURL(firebase.bdata?.imageURL).then((url) => setUrl(url));
    }
  }, [firebase.bdata]);
  console.log("url", firebase.bdata?.photoURL);
  return (
    <div>
      <img
        src={url}
        width="50%"
        height={500}
        style={{
          objectFit: "contain",
          marginLeft: "350px",
          marginRight: "auto",
          marginTop: "20px",
          borderRadius: "2cm",
        }}
      />
      <center>
        <Typography
          variant="h3"
          sx={{ paddingTop: "40px", paddingBottom: "20px" }}
        >
          {firebase.bdata?.title}
        </Typography>
      </center>
      <Typography
        variant="h6"
        sx={{
          marginLeft: "100px",
          marginRight: "100px",
          textAlign: "flex-end",
        }}
      >
        {firebase.bdata?.content}
      </Typography>
      {/* <img src={firebase.bdata?.photoURL}/> */}

      <p
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "50px ",
        }}
      >
        <Avatar
          alt="Remy Sharp"
          src={firebase.bdata?.photoURL}
          sx={{ width: 56, height: 56 }}
        />
        &nbsp;&nbsp;
        <Typography variant="h5" sx={{ paddingTop: "10px" }}>
          {firebase.bdata?.displayName}
        </Typography>
      </p>
    </div>
  );
};

export default BlogDetail;
