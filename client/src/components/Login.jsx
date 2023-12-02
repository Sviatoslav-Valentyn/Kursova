import { useDispatch } from "react-redux";
import { setAdmin, setAuth, setUser } from "../store/authSlice";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const {register, handleSubmit, formState: {errors}} = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [error, setError] = useState(false)

  const onSubmit = async ({username, password}) => {
    try {
      const response = await axios.post('http://localhost:3000/login', {
       username,
       password,
     })
     dispatch(setUser(response.data));
     dispatch(setAuth(true))
     if(response.data.admin) dispatch(setAdmin(true))
     navigate('/pharmacies')
     localStorage.setItem('username', response.data.username)
     localStorage.setItem('auth', true)    
    } catch (error) {
        setError(error)
    }
  }  

    return (
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <h2>Login</h2>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input {...register('username', {required: true})} type="text" id="username" name="username" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input {...register('password', {required: true})} type="password" id="password" name="password" />
          </div>
          {error && 'Invalid username or password'}
          <button>Login</button>
        </form>
      </div>
    );
};

export default Login