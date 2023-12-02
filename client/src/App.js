import { useDispatch, useSelector } from "react-redux";
import { privateRoutes, publicRoutes } from "./routes";
import { Route, Routes, useNavigate } from "react-router-dom";
import { logout, setAdmin, setAuth, setUser } from "./store/authSlice";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      const user = await axios.post(`http://localhost:3000/auth/${localStorage.getItem('username')}`).catch(err => console.log(err))
      user.data.admin && dispatch(setAdmin(true))
    }
    
    if(localStorage.getItem('auth')){
      localStorage.getItem('username') && fetchUser()
      dispatch(setUser({username: localStorage.getItem('username' || '')}))  
      dispatch(setAuth(true))
    }
  }, [])

  return (
    <div className="app">
      <div className="header">
        {isAuth ? (
          <ul className="flex items-center justify-center text-2xl">
            <li>{localStorage.getItem("username")}</li>
            <div className="h-6 w-[1px] bg-white mx-4"></div>
            <li onClick={() => dispatch(logout())} className="cursor-pointer">logout</li>
          </ul>
        ) : (
          <ul className="flex items-center justify-center gap-5 text-2xl">
            <Link to={'/login'}>Login</Link>
            <Link to={'/registration'}>Register</Link>
          </ul>
        )}
      </div>
      <Routes>
        {isAuth
          ? privateRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))
          : publicRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
      </Routes>
    </div>
  );
}

export default App;
