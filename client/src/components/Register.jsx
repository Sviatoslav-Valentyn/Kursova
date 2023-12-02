import { useForm } from "react-hook-form";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { setAuth, setUser } from "../store/authSlice";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const {register, handleSubmit, formState: {errors}} = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = async ({username, password}) => {
     const response = await axios.post('http://localhost:3000/register', {
      username,
      password,
    })
    dispatch(setUser(response.data));
    dispatch(setAuth(true))
    navigate('/pharmacies')
    localStorage.setItem('auth', 'true')
    localStorage.setItem('username', response.data.username)    
  }  


  return (
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <h2>Register</h2>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input {...register('username', {required: true})} type="text" id="username" name="username" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input {...register('password', {required: true})} type="password" id="password" name="password" />
          </div>
          <button>Register</button>
        </form>
      </div>
    );
};

export default Register