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
          render={(props) => <Login onLogin={handleLogin} {...props} />}
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
          component={Story}
          currentUser={currentUser}
          isAuthenticated={isAuthenticated}
        />
        {/*<Route
          path="/my_stories"
          component={SavedStories}
          authenticated={isAuthenticated}
        />*/}
        <Route
          path="/create_story"
          component={StoryCreate}
          authenticated={isAuthenticated}
        />
        <Route
          path="/update_story/:id"
          component={StoryUpdate}
          authenticated={isAuthenticated}
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
      </Switch>
    </Router>
  );
}

export default App;
