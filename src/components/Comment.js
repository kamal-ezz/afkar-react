import { useContext, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { UserContext } from "../UserContext";
import repliesFromServer from "../fakeApi/replies";
import users from "../fakeApi/users";

function Comment({ data }) {
  const { user } = useContext(UserContext);

  const [replyBox, setReplyBox] = useState(false);
  const [replies, setReplies] = useState([]);

  const [reply, setReply] = useState("");

  //const [ commenter, setCommenter ] = useState({})

  useEffect(() => {
    /* const writer = users.filter( user => user.id === data.userId)
        setCommenter(writer) */

    const repliesForThisComment = repliesFromServer.filter(
      (reply) => reply.commentId === data.id
    );
    setReplies(repliesForThisComment);
  }, [users, repliesFromServer]);

  const getUser = (id) => {
    return users.filter((user) => user.id == id)[0];
  };

  const replyHandler = () => {
    setReplyBox((replyBox) => !replyBox);
  };

  const addReplyHandler = (e) => {
    e.preventDefault();
    setReplies([
      ...replies,
      {
        id: replies.length + 1,
        owner: "yyy",
        body: reply,
      },
    ]);
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
              onClick={replyHandler}
              style={{ cursor: "pointer" }}
            >
              Repondre
            </span>
            {user.id === data.userId ? (
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
          onSubmit={addReplyHandler}
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
              {user ? (
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
