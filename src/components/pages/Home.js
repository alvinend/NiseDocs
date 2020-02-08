import React from 'react'
import { Link } from 'react-router-dom'

const Home = ({
  handleLogOut,
  documents,
  match,
  handleOnCreateDocument
}) => {
  return (
    <div className="home">
      <h1>Welcome {localStorage.getItem('email')}</h1>
      <ul>
       {documents && documents.map( document => <li
        className={match.params.id  === document.id ? "active" : ""}
       >
        <Link to={`/document/${document.id}`}>
          {document.title} <span> Text-Document</span>
          <span>{document.author}</span>
        </Link>
       </li>)}
      </ul>
      <button onClick={handleOnCreateDocument}>新規ドキュメント</button>
      <button onClick={handleLogOut}>Log Out</button>
    </div>
  )
}

export default Home
