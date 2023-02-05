import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from "react-bootstrap/Button";
import { useFirebase } from "../context/Firebase";
const CreateBlog = () => {
  const firebase = useFirebase();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  useEffect(() => {
    console.log("thumb", thumbnail);
  }, [thumbnail]);

  const handlePost = async (e) => {
    e.preventDefault();
    await firebase.UploadPost(title, content, thumbnail);
  };

  return (
    <div
      className="mt-3"
      style={{ width: "500px", marginLeft: "auto", marginRight: "auto" }}
    >
      <center>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>
              <h3>Title</h3>
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter title ... "
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>
              <h3>Blog Content</h3>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>
              <h3>Thumbnail Photo</h3>
            </Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setThumbnail(e.target.files[0])}
            />
          </Form.Group>
          <Button
            variant="success"
            style={{ paddingLeft: "20px", paddingRight: "20px" }}
            onClick={handlePost}
          >
            Post
          </Button>
        </Form>
      </center>
    </div>
  );
};

export default CreateBlog;
