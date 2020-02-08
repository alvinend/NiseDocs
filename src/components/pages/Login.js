import React from 'react'

const Login = ({
  handleOnChange,
  email,
  handleOnClick
}) => {

  return (
    <div>
      <h1>Welcome to NiseDocs</h1>
      <form>
        Email:
        <input type="text" name="firstname" value={email} onChange={handleOnChange} />
        <button onClick={handleOnClick}>Login</button>
      </form> 
    </div>
  )
}

export default Login
