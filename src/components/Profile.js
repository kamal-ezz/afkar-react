import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Paginate from "./Paginate";
import { Link, useHistory } from "react-router-dom";
import stories from "../fakeApi/stories";
import { getCurrentUserStories, uploadImage } from "../api.js";

function Profile({ isAuthenticated, currentUser }) {
  const [userStories, setUserStories] = useState([]);
  const [photo, setPhoto] = useState(null);
  const history = useHistory();

  const loadUserStories = () => {
    getCurrentUserStories()
      .then((res) => setUserStories(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (!isAuthenticated) {
      history.push("/login");
    }
    loadUserStories();
  }, []);

  const handlePhotoChange = (e) => {
    e.preventDefault();
    setPhoto(e.target.files[0]);
    const formData = new FormData();
    formData.append("file", photo);
    uploadImage(formData)
      .then((res) => {
        console.log(res.data);
        alert("File uploaded successfully.");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container fluid>
      <Row>
        <Col
          md={4}
          style={{
            backgroundImage: "linear-gradient(lightblue,blue)",
            height: "100vh",
          }}
          className="d-flex align-items-center justify-content-center flex-column"
        >
          <Row>
            <Image
              src={currentUser.image}
              roundedCircle
              style={{ width: 200, height: 200 }}
            />
          </Row>
          <Row>
            <Form onSubmit={handlePhotoChange}>
              <Form.Group>
                <Form.File
                  id="fileinput"
                  label="Upload your photo"
                  className="text-white mt-5"
                />
              </Form.Group>
            </Form>
          </Row>
          <Row style={{ marginTop: 30 }}>
            <h2 className="text-white">{currentUser.username}</h2>
          </Row>
        </Col>
        <Col md={8}>
          <h2 className="mt-4 ml-3">Information</h2>
          <hr />
          <div style={{ marginLeft: 20 }}>
            <h3 style={{ marginTop: 50 }}>Email</h3>
            <span style={{ fontSize: 18 }}>{currentUser.email}</span>
            <h3 style={{ marginTop: 50 }}>Stories</h3>
          </div>
          <div className="d-flex">
            {userStories.length !== 0 ? (
              userStories.map((story) => (
                <Card style={{ width: "16rem", marginTop: 20, marginLeft: 30 }}>
                  <Card.Img variant="top" src={story.storyImage} />
                  <Card.Body>
                    <Card.Title>{story.title}</Card.Title>
                    <Card.Text>{story.subtitle}</Card.Text>
                    <Link to={`/story/${story.id}`}>
                      <Button variant="dark">Voir story</Button>
                    </Link>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <>
                <p className="ml-4 mt-2">No stories yet!</p>
                <hr />
              </>
            )}
          </div>
          <Paginate />
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
