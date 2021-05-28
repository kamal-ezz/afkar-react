import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import SearchBox from "./SearchBox";
import { UserContext } from "../UserContext";
import { useHistory } from "react-router-dom";

function Header(props) {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  const logoutHandler = () => {
    setUser(0);
    history.push("/");
  };

  return (
    <header>
      <Navbar
        variant="dark"
        expand="lg"
        style={{ backgroundColor: "#CEF6F2", height: 60 }}
        collapseOnSelect
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                style={{ width: 45, height: 45, marginLeft: 30 }}
                src="imgs/logo.png"
              />
              <span className="text-dark">Afkar</span>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Route render={({ history }) => <SearchBox history={history} />} />

            <Nav className="ml-auto">
              {user ? (
                <NavDropdown
                  title={
                    <img
                      src={user.profilePhoto}
                      style={{
                        width: 45,
                        height: 45,
                        borderRadius: 50,
                        cursor: "pointer",
                        marginLeft: 30,
                      }}
                      alt="profile"
                    />
                  }
                  id="browsemenu"
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Mon profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/my_stories">
                    <NavDropdown.Item>Mes stories</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/create_story">
                    <NavDropdown.Item>Ecrire une story</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Déconnecter
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <Nav.Link href="/login" className="text-dark">
                    Se Connecter
                  </Nav.Link>
                  <Nav.Link href="/register" className="text-dark">
                    S'inscrire
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
