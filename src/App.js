import { useState } from "react"
import { UserContext } from "./UserContext"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Header from './components/Header'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import Story from './components/Story'
import SavedStories from './components/SavedStories'
import Home from './components/Home'


function App() {

  const [user, setUser] = useState(0);

  return (

  	<Router>
		<UserContext.Provider value={ {user, setUser} }>
			<Header />

			<Switch>
				<Route path='/login' component={Login} />
				<Route path='/register' component={Register} />
				<Route path='/profile' component={Profile} />
				<Route path='/story' component={Story} />
				<Route path='/my_stories' component={SavedStories} />
				<Route path='/' exact component={Home} />
				
			</Switch>


		</UserContext.Provider>	
  	</Router>
    
  );
}

export default App;
