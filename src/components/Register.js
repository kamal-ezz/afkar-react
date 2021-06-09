import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { signup } from "../api.js";
import { useHistory } from "react-router";

const Register = ({ location, isAuthenticated }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
  }, [history, isAuthenticated]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      const signupRequest = {
        username: name,
        email,
        password,
        image: "imgs/default.svg",
      };

      signup(signupRequest)
        .then((res) => {
          console.log(res.data);
          history.push("/activate");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center flex-column"
      style={{ marginTop: 80, marginBottom: 50 }}
    >
      <div
        className="d-flex justify-content-center align-items-center mb-3"
        style={{
          height: 150,
          backgroundImage: `url("imgs/register1.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: 450,
        }}
      >
        <h1>S'insrire</h1>
      </div>

      {/* {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />} */}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="name"
            placeholder="Entrer le nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: 450 }}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Address Email </Form.Label>
          <Form.Control
            type="email"
            placeholder="Entrer email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: 450 }}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="Entrer mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: 450 }}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirmer Mot de passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirmer mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ width: 450 }}
          ></Form.Control>
        </Form.Group>

        <Row className="py-3">
          <Button type="submit" variant="dark" className="mx-auto">
            S'inscrire
          </Button>
        </Row>
      </Form>

      <Row className="py-3">
        <Col>
          Vous avez un compte? <Link to="/login">Se connecter</Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
