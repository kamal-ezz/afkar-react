import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import Comment from "./Comment";
import stories from "../fakeApi/stories.js";
import commentsFromApi from "../fakeApi/comments.js";
import savedStories from "../fakeApi/savedStories.js";
import users from "../fakeApi/users.js";
import { createComment, getComments, getStoryDetails, getUserInfo } from '../api.js'

function Story({ currentUser, isAuthenticated, match }) {
  const [story, setStory] = useState({});
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [writer, setWriter] = useState({});
  const [comment, setComment] = useState("");
  const storyId = match.params.id


  const loadComments = () => {
    getComments(storyId).then(res => {
          setComments([...res.json()])
      }).catch(err => {
        console.log(err)
      })
    }


  const loadStoryContent = () => {
    getStoryDetails(storyId).then(res => {

      setStory({
        title: res.title,
        subtitle: res.subtitle,
        body: res.content,
        totalLikes: res.totalLikes,
        date: res.createdAt
      })

      const userId = res.userId;

      getUserInfo(userId).then(res => {
          setWriter({
            name: res.userName,
            profilePhoto: res.image
          })
      }).catch(err => {
        console.log(err)
      })
    }).catch(err => {
      console.log(err)
    })
  }



  useEffect(() => {
    loadStoryContent()
    loadComments()

    /*let sstory;
    for (sstory in savedStories) {
      if (sstory.userId === user.id && sstory.id === story.id) {
        setSaved(true);
      }
    }*/

  }, []);

 

  const handleLikes = (e) => {
    e.preventDefault();
    setLiked((liked) => (liked = !liked));
    if (!liked) {
        setStory({ ...story, totalLikes: story.totalLikes + 1 })
        //api request
      }
    else { setStory({ ...story, totalLikes: story.totalLikes - 1 }) };
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!saved) setSaved(true);
  };

  const handleComment = (e) => {
    e.preventDefault();
    setComments([
      ...comments,
      {
        id: comments.length + 1,
        owner: currentUser.userName,
        body: comment,
      },
    ]);

    createComment(storyId, comments).then(res => { console.log('comment created') })
                                    .catch(err => console.log(err))

    console.log(e.target.value);
  };

  return (
    <Container fluid style={{ marginTop: 80 }}>
      <Row
        className="d-flex justify-content-center flex-column"
        style={{ marginLeft: 120 }}
      >
        <h1 style={{ fontSize: 36 }} className="ml-5">
          {story.title}
        </h1>
        <h2 style={{ color: "gray" }} className="ml-5 mt-3">
          {story.subtitle}
        </h2>
        <div
          className="d-flex align-items-center ml-5 mb-5"
          style={{ marginTop: 50 }}
        >
          <img
            className="rounded-circle"
            style={{ width: 50, height: 50 }}
            src={writer.profilePhoto}
            alt="owner"
          />
          <div className="ml-3">
            <div>
              <span>{writer.name}</span>
              <a
                href="#"
                style={{
                  backgroundColor: "aquamarine",
                  border: "none",
                  color: "gray",
                  fontSize: 14,
                  padding: 5,
                }}
                className="ml-2"
              >
                Follow
              </a>
            </div>
            <span className="pb-3 pr-5 text-secondary">{story.date}</span>
          </div>
        </div>
      </Row>

      <Row style={{ marginLeft: 120 }} className="d-flex flex-column">
        <img
          style={{ width: "80%", height: 400 }}
          src={story.storyImage}
          className="ml-5"
          alt="story-image"
        />
        <p className="ml-5 mt-3" style={{ fontSize: 17 }}>
          {story.body}
        </p>

        {isAuthenticated ? (
          <div className="pt-5">
            <a class="btn btn-danger" href="#">
              <i class="fas fa-trash-alt"></i>
              Supprimer
            </a>
            <a class="btn btn-success" href="#">
              <i class="far fa-edit"></i>
              Modifier
            </a>
          </div>
        ) : (
          <></>
        )}

        <div className="pt-5  ml-5 d-flex">
          <form onSubmit={handleLikes}>
            <Button className="p-2" type="submit" variant="warning">
              <i className="far fa-heart fa-lg mr-2"> </i>
              {story.totalLikes}
            </Button>
          </form>
          <form className="ml-3" onSubmit={handleSave}>
            <Button className="p-2" type="submit" variant="info">
              <i className="far fa-bookmark fa-lg bookmark mr-2"> </i>
              Sauvegarder
            </Button>
          </form>
        </div>
      </Row>

      <Row style={{ marginLeft: 120 }} className="d-flex flex-column">
        <h3 style={{ fontSize: 22 }} className="mt-5 ml-5">
          Commentaires
        </h3>

        <form className="ml-5 mt-2" onSubmit={handleComment}>
          <textarea
            name="content"
            placeholder="Qu'est ce que vous pensez ?"
            style={{
              width: 600,
              height: 80,
              fontSize: 16,
              padding: 10,
            }}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>

          <Button
            type="submit"
            variant="dark"
            style={{ display: "block" }}
            className="mt-1"
          >
            Commenter
          </Button>
        </form>

        {comments.map((comment) => (
          <Comment data={comment} currentUser={currentUser} isAuthenticated={isAuthenticated} />
        ))}
      </Row>
    </Container>
  );
}

export default Story;
