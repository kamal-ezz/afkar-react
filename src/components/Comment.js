import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import repliesFromServer from "../fakeApi/replies";
import users from "../fakeApi/users";
import { createReply, getReplies, getUserInfo } from "../api.js";

function Comment({ data, getCurrentUser, currentUser, isAuthenticated }) {
  const [replyBox, setReplyBox] = useState(false);
  const [replies, setReplies] = useState([]);
  const [reply, setReply] = useState("");
  const commentId = data.id;

  const loadReplies = () => {
    getReplies(commentId)
      .then((res) => {
        setReplies([...res.json()]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadReplies();
  }, []);

  const getUser = (id) => {
    getUserInfo(id).then((res) => {
      return {
        name: res.userName,
        profilePhoto: res.profilePhoto,
      };
    });
  };

  const handleReplyBox = () => {
    setReplyBox((replyBox) => !replyBox);
  };

  const handleReply = (e) => {
    e.preventDefault();
    setReplies([
      ...replies,
      {
        id: replies.length + 1,
        owner: currentUser.userName,
        body: reply,
      },
    ]);

    createReply(commentId, replies);
  };

  return (
    <>
      <div class="d-flex" style={{ margin: "30px 0 0 60px" }}>
        <img
          className="rounded-circle"
          style={{ width: 50, height: 50 }}
          src={getUser(data.userId).profilePhoto}
        />
        <div className="d-flex flex-column pl-3">
          <span>
            <a href="#">{getUser(data.userId).name}</a>
          </span>
          <p> {data.body} </p>
          <div className="mt-n3">
            <span
              id={data.id}
              onClick={handleReplyBox}
              style={{ cursor: "pointer" }}
            >
              Repondre
            </span>
            {isAuthenticated ? (
              <>
                <a href="#">Modifier</a>
                <a href="#">Supprimer</a>
              </>
            ) : null}
          </div>
        </div>
      </div>

      {replyBox ? (
        <form
          onSubmit={handleReply}
          style={{ marginLeft: 130 }}
          className="my-3"
        >
          <textarea
            name="content"
            style={{
              width: 600,
              height: 60,
              fontSize: 16,
              padding: 10,
            }}
            onChange={(e) => setReply(e.target.value)}
          ></textarea>
          <Button type="submit" variant="dark" style={{ display: "block" }}>
            Répondre
          </Button>
        </form>
      ) : null}

      {replies.map((reply) => (
        <div className="d-flex" style={{ margin: "20px 0 10px 140px" }}>
          <img
            src={getUser(reply.userId).profilePhoto}
            alt={reply.owner}
            className="rounded-circle"
            style={{ width: 50, height: 50 }}
          />
          <div className="d-flex flex-column pl-3">
            <span>
              <a href="#">{getUser(reply.userId).name}</a>
            </span>
            <p>{reply.body}</p>
            <div className="mt-n3">
              {isAuthenticated ? (
                <>
                  <a href="#">Modifier</a>
                  <a href="#">Supprimer</a>
                </>
              ) : null}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Comment;
