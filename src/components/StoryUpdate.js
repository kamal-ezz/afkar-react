import { useState, useContext, useEffect } from "react";
import { Form, Button, Row, Container } from "react-bootstrap";
import stories from "../fakeApi/stories";

function StoryUpdate({ match }) {
  const storyId = match.params.id;

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState("");

  const addPhoto = () => {};

  const submitHandler = () => {};

  useEffect(() => {
    const story = stories.filter((story) => story.id === storyId)[0];
    setTitle(story.title);
    setSubtitle(story.subtitle);
    setContent(story.body);
    setPhoto(story.storyImage);
  }, [stories, storyId]);

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center flex-column"
      style={{ marginTop: 80 }}
    >
      <Form onSumbit={submitHandler}>
        <Form.Group controlId="title">
          <Form.Label>Titre:</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: 450 }}
          />
        </Form.Group>

        <Form.Group controlId="subtitle">
          <Form.Label>Sous-titre:</Form.Label>
          <Form.Control
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            style={{ width: 450 }}
          />
        </Form.Group>

        <Form.Group controlId="content">
          <Form.Label>Contenu:</Form.Label>
          <Form.Control
            type="text"
            as="textarea"
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ width: 450 }}
          />
        </Form.Group>

        <Form.Group>
          <Form.File
            id="fileInput"
            label="Ajouter une photo :"
            onChange={addPhoto}
          />
        </Form.Group>

        <Row className="py-3">
          <Button type="submit" variant="dark" className="mx-auto">
            Créer
          </Button>
        </Row>
      </Form>
    </Container>
  );
}

export default StoryUpdate;
