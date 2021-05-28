import { UserContext } from "../UserContext";
import { useState, useContext } from "react";
import Message from "./Message";
import Loader from "./Loader";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import users from "../fakeApi/users.js";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);

  const submitHandler = (e) => {
    e.preventDefault();
    setUser(users[0]);
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
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="email">
              <Form.Label>Address Email</Form.Label>
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

            <Row className="py-3">
              <Button type="submit" variant="dark" className="mx-auto">
                Continuer
              </Button>
            </Row>

            <Row className="py-3">
              <Button type="submit" variant="dark" className="mx-auto">
                Test
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
