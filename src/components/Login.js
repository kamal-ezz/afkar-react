import { ACCESS_TOKEN, login } from "../api.js";
import { useState } from "react";
import Message from "./Message";
import Loader from "./Loader";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useEffect } from "react";

function Login({ onLogin, isAuthenticated }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) history.push("/");
  }, [isAuthenticated, history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginRequest = {
      username,
      password,
    };

    login(loginRequest)
      .then((res) => {
        localStorage.setItem(ACCESS_TOKEN, res.data.authenticationToken);
        onLogin();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container fluid>
      <Row>
        <Col md={5}>
          <img
            style={{ width: "100%", height: "100vh" }}
            src="imgs/login1.jpg"
          />
        </Col>

        <Col
          md={7}
          style={{ marginTop: 30 }}
          className="d-flex justify-content-center align-items-center flex-column"
        >
          <h1 className="py-4">Se Connecter</h1>

          {/*  {error && <Message variant='danger'>{error}</Message>}
		   {loading && <Loader />} */}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label>Nom de l'utilisateur</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrer nom d'utilisateur"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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

            <Row className="py-3">
              <Button type="submit" variant="dark" className="mx-auto">
                Continuer
              </Button>
            </Row>
          </Form>

          <Row className="py-3">
            <Col>
              Vous n'avez pas un compte? <Link to="/register">S'inscrire</Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
