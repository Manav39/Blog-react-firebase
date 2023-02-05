import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleLogin = () => {
    firebase.SignInUser(email, pass);
    navigate("/explore");
  };

  const handleGoogle = () => {
    firebase.SignInWithGoogle();
    navigate("/explore");
  };
  return (
    <div
      style={{
        paddingLeft: "400px",
        paddingRight: "400px",
        paddingTop: "100px",
      }}
    >
      <div style={{ border: "1px solid black", padding: "20px" }}>
        <center>
          <h2>Login</h2>
        </center>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
          </Form.Group>
          <center>
            <Button variant="primary" type="submit">
              Login
            </Button>
            <Link to="/register">
              <p style={{ paddingTop: "10px" }}>New User? Sign Up</p>
            </Link>
            <h3 style={{ marginTop: "10px" }}>OR</h3>
            <Button variant="danger" onClick={handleGoogle}>
              Sign In With Google
            </Button>
          </center>
        </Form>
      </div>
    </div>
  );
};

export default Login;
