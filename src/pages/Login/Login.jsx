import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContexxt'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import "./login.css"
const Login = () => {

  const navigate = useNavigate()
  const [credentials,setCredentials] = useState({
    username :undefined,
    password: undefined,
  })

  const {loading,error,dispatch} = useContext(AuthContext)


  const handleChange = (e)=>{
    setCredentials((prev)=> ({...prev , [e.target.id] : e.target.value}))
  }

  const handleClick = async (e) =>{
    e.preventDefault();
    dispatch({type: "LOGIN_START"})
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login",credentials);
      dispatch({type: "LOGIN_SUCCESS", payload: res.data.details})
      navigate("/")
    } catch (err) {
      console.log(err.response.data)
      dispatch({type: "LOGIN_FAILURE", payload: err.response.data})
    }
  }

  return (
    <div className='login'>
        <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>
        {error && <span>{error.message}</span>}
        </div>
    </div>
  )
}

export default Login