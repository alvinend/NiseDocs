import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from './components/pages/Login';
import Document from './components/pages/Document';
import Home from './components/pages/Home';
import axios from 'axios';
import styled from 'styled-components'

const StyledContainer = styled.div`
  display: flex;

  & *{  
    margin: 0;
    padding: 0;
    text-decoration: none;
    list-style: none;
    color: #667D80;
    box-sizing: content-box;
  }


  & .home {
    width: 20rem;
    text-align: center;
    box-shadow: 10px 2px 5px 0px rgba(0,0,0,0.21);
    min-height: 100vh;

    & h1 {
      background: #407A80;
      color: #CCFBFF;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 8rem;
    }

    & ul {
      display: flex;
      flex-direction: column;
      text-align: left;
      font-size: 1.5rem;
      font-weight: 600;

       & li {
         height: 6rem;
         padding: 1.5rem 1rem;
         border-bottom: 1px solid #667D80;

         & a {
           width: 100%;
           height: 100%;
           display: block;
           & span {
            display: block;
            font-size: 1rem;
            font-weight: 200;
            margin-top: 0.3rem;
          }
         }
       }
    }

    & button {
      margin: 1.5rem 1rem;
      width: calc(100% - 4rem);
      height: 4rem;
      background: inherit;
      border : 1px solid #667D80;
      font-size: 1.2rem;
      font-weight: 600;
      cursor: pointer;

      &:hover {
        background: #407A80;
        color: #CCFBFF;
      }
    }
  }

  
  & .document {
    text-align: center;
    width: calc( 100% - 20rem);
    display: flex;
    flex-direction: column;
    justify-content: center;

    & textarea {
      display: block;
      margin: 2rem 10rem;
      padding: 2rem;
      resize: none;
      outline: none;
      overflow: auto;
      min-height: 20rem;
      height: 75vh;
      box-shadow: 2px 1px 14px 3px rgba(0,0,0,0.3);
      border: 0;
    }
  }
`

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
      <StyledContainer>
        {isLoggedIn ?
        <React.Fragment>
          <Home 
            handleLogOut={handleLogOut}
            documents={documents}
          />
          <Switch>
            <Route path="/document/:id" component={props => <Document 
              {...props}
              documents={documents}
            />}/>
          </Switch> 
        </React.Fragment>
        :
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
        
      </StyledContainer>
    </Router>
  )
}

export default App
