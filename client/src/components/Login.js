import React, { useState } from "react";
import axios from 'axios';

const Login = () => {

  const [userName, setUserName] = useState('');
  const [pass, setPass] = useState('');

  const nameHandler = e => {
    setUserName(e.target.value)
  };

  const passHandler = e => {
    setPass(e.target.value)
  };

  const submitHandler = e => {
    e.preventDefault();
    let credentials = {
      username: userName,
      password: pass
  }
    axios
    .post('http://localhost:5000/api/login', credentials)
    .then(res => {
      localStorage.setItem('token', res.data.payload)
    })
    .catch(err => console.log('post error', err.response))

    setUserName('');
    setPass('');
  }

  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={submitHandler}>
        <input type="text" value={userName} onChange={nameHandler} placeholder="username" />
        <input type="password" value={pass} onChange={passHandler} placeholder="password" />
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;
