import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

export default function SignUp({ onSignup }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const deleteFoodHandler = (e, email, password) => {
    e.preventDefault();
    const foodId = e.target.id;
    axios
      .post(`http://localhost:8080/food/delete/${foodId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 422) {
          throw new Error("Deleting failed.");
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log("Error!");
          throw new Error("Could not delete food!");
        }
        return res.data;
      })
      .then((resData) => {
        console.log(resData);
        window.location = "/my-foods";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Edit Food</h1>
      <Form onSubmit={(e) => onSignup(e, name, email, password)}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
