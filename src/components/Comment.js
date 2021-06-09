import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import repliesFromServer from "../fakeApi/replies";
import users from "../fakeApi/users";
import { createReply, getReplies, getUserInfo, deleteComment } from "../api.js";

function Comment({ data, getCurrentUser, currentUser, isAuthenticated }) {
  const [replyBox, setReplyBox] = useState(false);
  const [replies, setReplies] = useState([]);
  const [reply, setReply] = useState("");
  const commentId = data.id;

  const loadReplies = () => {
    getReplies(commentId)
      .then((res) => {
        setReplies(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadReplies();
  }, []);

  const handleCommentDelete = () => {};

  const getUser = (id) => {
    getUserInfo(id).then((res) => {
      return {
        name: res.data.username,
        profilePhoto: res.data.image,
      };

      // console.log(res.data);
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
          src={currentUser.image}
        />
        <div className="d-flex flex-column pl-3 mb-5">
          <span>
            <a href="#">{currentUser.username}</a>
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
                <span
                  onClick={handleReplyBox}
                  style={{ cursor: "pointer" }}
                  className="ml-2"
                >
                  Modifier
                </span>
                <span
                  onClick={handleCommentDelete}
                  style={{ cursor: "pointer" }}
                  className="ml-2"
                >
                  Supprimer
                </span>
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
            src={getUser(reply.userId).image}
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
