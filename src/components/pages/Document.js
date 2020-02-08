import React from 'react'
import socketIOClient from "socket.io-client";

const endpoint = "localhost:3001"

const Document = ({
  match
}) => {
  const socket = socketIOClient(endpoint);
  const documentID = match.params.id
  const [value, setValue] = React.useState('')

  const handleOnChange = (e) =>{
    socket.emit('changeValue', ({id: documentID, value: e.target.value}))
  }

  React.useEffect(() => {
    setInterval(() => {
      socket.emit('getValue', documentID)
    }, 100000)
    socket.on('getValue', ({id, value}) => {
       if(id === documentID){
          setValue(value)
       }
    })
  }
  ,[documentID, socket])

  return (
    <div>
      WELCOME TO DOCUMENT
      <textarea rows="4" cols="50" value={value} onChange={handleOnChange}/>
    </div>
  )
}

export default Document
