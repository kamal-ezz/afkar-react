import { useState, useContext } from "react";
import { Form, Button, Row, Container } from "react-bootstrap";
import { createStory, uploadImage } from "../api.js";

function StoryCreate() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  //const [photo, setPhoto] = useState(null);

  const addPhoto = (e) => {
    e.preventDefault();
    //setPhoto(e.target.files[0]);
    const formData = new FormData();
    formData.append("data", e.target.files[0]);
    uploadImage(formData)
      .then((res) => {
        console.log(res.data);
        alert("File uploaded successfully.");
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storyData = {
      title,
      subtitle,
      content,
    };

    createStory(storyData)
      .then((res) => console.log("Story succesfully created"))
      .catch((err) => console.log(err));
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center flex-column"
      style={{ marginTop: 80 }}
    >
      <Form onSubmit={handleSubmit}>
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

export default StoryCreate;
