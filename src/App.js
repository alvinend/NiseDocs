import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './components/pages/Login';
import Document from './components/pages/Document';
import Home from './components/pages/Home';
import axios from 'axios';

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [documents, setDocuments] = React.useState([])

  const handleOnChange = (e) => setEmail(e.target.value)
  const handleOnClick = () => {
    localStorage.setItem('email', email)
    setIsLoggedIn(!!localStorage.getItem('email'))
  }
  const handleLogOut = () => {
    localStorage.setItem('email', '')
    setIsLoggedIn(!!localStorage.getItem('email'))
  }

  React.useEffect(() => {
    const getDocuments =  async () => {
      const Documents = await axios.get('/api/documentsInfo')
      setDocuments(Documents.data)
      console.log(Documents);
      
    }
    getDocuments()
    setIsLoggedIn(!!localStorage.getItem('email'))
  }
  ,[])

  return (
    <Router>
      <div>
        {isLoggedIn ?
        <Switch>
          <Route path="/document/:id" component={Document}/>
          <Route path="/">
            <Home 
              handleLogOut={handleLogOut}
              documents={documents}
            />
          </Route>
        </Switch> :
        <Switch>
          <Route path="/">
            <Login
              email={email}
              handleOnChange={handleOnChange}
              handleOnClick={handleOnClick}
            />
          </Route>
        </Switch>
        }
        
      </div>
    </Router>
  )
}

export default App
