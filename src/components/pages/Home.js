import React from 'react'
import { Link } from 'react-router-dom'

const Home = ({
  handleLogOut,
  documents
}) => {
  return (
    <div className="home">
      <h1>Welcome {localStorage.getItem('email')}</h1>
      <ul>
       {documents && documents.map( document => <li>
        <Link to={`/document/${document.id}`}>
          {document.title} <span> Text-Document</span>
        </Link>
       </li>)}
      </ul>
      <button onClick={handleLogOut}>新規ドキュメント</button>
      <button onClick={handleLogOut}>Log Out</button>
    </div>
  )
}

export default Home
