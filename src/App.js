import './App.css';
import {BrowserRouter as Router, Routes, Route,useNavigate} from "react-router-dom"
import LandingPage from './route/LandingPage';
import PrivateRoute from './component/PrivateRoute';
import Home from './route/Home';
import { API, setAuthToken } from "./config/api";
import { useContext,useEffect } from 'react';
import { UserContext } from './context/UserContext';

function App() {
  return (
    <Router>
      <Beam/>
    </Router>
  )
}

function Beam() {
  const navigate = useNavigate()
  const [state,dispatch] = useContext(UserContext)
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);

    }
  }, [state]);
  

  const checkUser = async () =>{
    console.log('true');
    try {

      const response = await API.get('/user')

      if (response.status == 200){
        return dispatch({
          type:"USER_SUCCESS",
          payload: response.data.data.users,
        })
      } else {
        return dispatch({
          type:"LOGOUT"
        })
      }
      
    } catch (error) {
      console.log(error);
      dispatch({
        type:"LOGOUT"
      })
    }
  }

  useEffect(() => {
      checkUser();
  }, []);

  return (
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/" element={<PrivateRoute/>}>
          <Route path="/home" element={<Home/>}/>
        </Route>
      </Routes>
  );
}

export default App;
