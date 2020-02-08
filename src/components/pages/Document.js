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
    console.log(documentID);
    socket.emit('getValue', documentID)
    socket.on('getValue', ({id, value}) => {
      console.log(documentID);
      if(id === documentID){
          setValue(value)
      }
      console.log(value);
    })
    
    return () => {
        console.log('Leaving Socket');
        socket.disconnect() 
      }}
  ,[match.params.id]);

  return (
    <div className="document">
      <h1>{documents.filter(document => document.id === documentID)[0].title}</h1>
      <textarea value={value} onChange={handleOnChange}/>
    </div>
  )
}

export default Document
