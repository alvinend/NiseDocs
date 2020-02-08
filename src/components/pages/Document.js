import React from 'react'
import socketIOClient from "socket.io-client";

const endpoint = "localhost:3001"

const Document = ({
  match,
  documents
}) => {
  const documentID = match.params.id
  const [value, setValue] = React.useState('')
  const socket = socketIOClient(endpoint)

  const handleOnChange = (e) =>{
      setValue(e.target.value)
  }
  var manager = socketIOClient.Manager(endpoint, { /* options */ });
    manager.socket('/namespace');
    manager.on('connect_error', function() {
        // eslint-disable-next-line no-restricted-globals
        location.reload()
    })
  
    manager.on('connect_error', function() {
      // eslint-disable-next-line no-restricted-globals
      location.reload()
   })

    manager.on('connect_error', function() {
      // eslint-disable-next-line no-restricted-globals
      location.reload()
    })


  React.useEffect(() => {
    const timer = setInterval(() => {
      console.log("Sended");
      
      socket.emit('changeValue', ({id: documentID, value: value}))
    }, 2000)

    return () => clearTimeout(timer)
  }
  ,[value])

  React.useEffect(() => {
    return () => {
        console.log('Leaving Socket');
        socket.emit('leave room', {
          room: 'test-room'
        })
      }}
  ,[]);

  React.useEffect(() => {
    socket.on('getValue', ({id, value}) => {
      if(id === documentID){
          setValue(value)
      }
    })
  },[]); 

  return (
    <div className="document">
      {match.params.id}
      <textarea rows="4" cols="50" value={value} onChange={handleOnChange}/>
    </div>
  )
}

export default Document
