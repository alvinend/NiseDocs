import React from 'react'
import { Link } from 'react-router-dom'

const Home = ({
  handleLogOut,
  documents
}) => {
  return (
    <div>
      Welcome {localStorage.getItem('email')}
      <h1>Documents: </h1>
      <ul>
       {documents && documents.map( document => <li>
        <Link to={`/document/${document.id}`}>{document.title}</Link>
       </li>)}
      </ul>
      <button onClick={handleLogOut}>Log Out</button>
    </div>
  )
}

export default Home
