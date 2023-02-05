import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleRegister = () => {
    firebase.CreateUser(email, pass);
    navigate("/explore");
  };

  return (
    <div
      style={{
        paddingLeft: "400px",
        paddingRight: "400px",
        paddingTop: "120px",
      }}
    >
      <div style={{ border: "1px solid black", padding: "20px" }}>
        <center>
          <h2>Register</h2>
        </center>
        <Form onSubmit={handleRegister}>
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
              Register
            </Button>
          </center>
        </Form>
      </div>
    </div>
  );
};

export default Register;
