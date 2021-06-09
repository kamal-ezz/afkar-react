import { useState, useEffect } from "react";
import { ACCESS_TOKEN, getCurrentUser } from "./api.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useHistory } from "react-router";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Story from "./components/Story";
//import SavedStories from "./components/SavedStories";
import Home from "./components/Home";
import StoryCreate from "./components/StoryCreate";
import StoryUpdate from "./components/StoryUpdate";
import AccountActivation from "./components/AccountActivation.js";

function App() {
  const history = useHistory();

  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadCurrentUser = () => {
    setIsLoading(true);
    getCurrentUser()
      .then((res) => {
        setCurrentUser(res.data);
        console.log(res.data);
        setIsAuthenticated(true);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    setCurrentUser(null);
    setIsAuthenticated(false);
    history.push("/");
  };

  const handleLogin = () => {
    loadCurrentUser();
    history.push("/");
  };

  useEffect(() => {
    loadCurrentUser();
  }, []);

  return (
    <Router>
      <Header
        isAuthenticated={isAuthenticated}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      <Switch>
        <Route
          path="/login"
          render={(props) => (
            <Login
              onLogin={handleLogin}
              isAuthenticated={isAuthenticated}
              {...props}
            />
          )}
        />
        <Route path="/register" component={Register} />
        <Route
          path="/profile"
          render={(props) => (
            <Profile
              isAuthenticated={isAuthenticated}
              currentUser={currentUser}
              {...props}
            />
          )}
        />
        <Route
          path="/story/:id"
          render={(props) => (
            <Story
              isAuthenticated={isAuthenticated}
              currentUser={currentUser}
              {...props}
            />
          )}
        />
        {/*<Route
          path="/my_stories"
          component={SavedStories}
          authenticated={isAuthenticated}
        />*/}
        <Route
          path="/create_story"
          render={(props) => (
            <StoryCreate
              isAuthenticated={isAuthenticated}
              currentUser={currentUser}
              {...props}
            />
          )}
        />
        <Route
          path="/update_story/:id"
          render={(props) => (
            <StoryUpdate
              isAuthenticated={isAuthenticated}
              currentUser={currentUser}
              {...props}
            />
          )}
        />
        <Route
          path="/"
          exact
          render={(props) => (
            <Home
              isAuthenticated={isAuthenticated}
              currentUser={currentUser}
              handleLogout={handleLogout}
              {...props}
            />
          )}
        />
        <Route path="/activate" component={AccountActivation} />
        <Route path="/search/:keyword" component={Home} exact />
      </Switch>
    </Router>
  );
}

export default App;
