import { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Paginate from "./Paginate";
import { getAllStories } from "../api.js";

function Home({ match, isAuthenticated }) {
  const pageNumber = match.params.pageNumber || 1;
  const [stories, setStories] = useState([]);

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(null);

  useEffect(() => {
    getAllStories()
      .then((res) => {
        setStories(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container fluid  style={{
            backgroundColor: "#CEF6F2",
            height: "100vh",
            width: "100%",
          }}>
      {!isAuthenticated ? (
          <Row>
            <Col md={1}></Col>
            <Col md={6} xs={12} style={{ marginTop: 150 }}>
              <p style={{ fontSize: 22 }}>
                Afkar est une platform où vous pouvez s’exprimer et écrire sur
                votre passions!
              </p>
              <Link to="/register">
                <Button variant="dark" size="lg">
                  Rejoindre
                </Button>
              </Link>
            </Col>
            <Col md={4}>
              <img
                style={{ width: 450, height: 400, marginTop: 80 }}
                src="imgs/idea.png"
                alt="idea logo"
              />
            </Col>
          </Row>
      ) : (
        <>
          <div>
            <h2 className="text-center py-5" style={{ color: "gray" }}>
              Bienvenue
            </h2>
            <h3 className="pl-5 pb-3">Les derniers stories</h3>
          </div>

          <hr />

          {stories.length !== 0 ? (
            stories.map((story) => (
              <>
                <Row className="py-4">
                  <Col md={1}></Col>
                  <Col md={2}>
                    <img
                      src={story.image}
                      style={{ height: 150, width: 175, marginRight: 30 }}
                    />
                  </Col>
                  <Col md={9}>
                    <h3>{story.title}</h3>
                    <h4>{story.subtitle}</h4>
                    <Link to={`/story/${story.id}`}>Lire la suite</Link>
                  </Col>
                </Row>

                <hr />
              </>
            ))
          ) : (
            <>
              <div>
                <p>No stories found!!</p>
              </div>
              <hr />
            </>
          )}
        </>
      )}

      <Paginate />
    </Container>
  );
}

export default Home;
