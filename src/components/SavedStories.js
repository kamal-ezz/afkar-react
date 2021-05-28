import { useState, useEffect, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Paginate from "./Paginate";
import savedStoriesFromServer from "../fakeApi/savedStories";
import { UserContext } from "../UserContext";

function SavedStories() {
  const [savedStories, setSavedStories] = useState([]);

  const { user } = useContext(UserContext);

  useEffect(() => {
    const s = savedStoriesFromServer.filter(
      (story) => story.userId === user.id
    );
    setSavedStories(s);
  }, [savedStoriesFromServer, user]);

  return (
    <Container fluid>
      <h2>Les stories enregistrés</h2>
      {savedStories.length !== 0 ? (
        savedStories.map((story) => (
          <Row className="py-4">
            <Col md={1}></Col>
            <Col md={2}>
              <img
                src={story.storyImage}
                style={{ height: 150, width: 175, marginRight: 30 }}
                alt="photo"
              />
            </Col>
            <Col md={9}>
              <h3>{story.title}</h3>
              <h4>{story.subtitle}</h4>
              <a class="link" href={`/story/${story.id}`}>
                Lire la suite
              </a>
            </Col>
          </Row>
        ))
      ) : (
        <>
          <div>
            <p>No stories found!!</p>
          </div>
          <hr />
        </>
      )}

      <Paginate />
    </Container>
  );
}

export default SavedStories;
