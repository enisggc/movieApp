
import './App.css';
import React,{useState} from 'react';
import { BrowserRouter as Router, Routes, Route,Link } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Register from './pages/Register';
import Login from './pages/Login';
import Favorites from "./pages/Favorites";
import { useEffect } from "react";
import Profile from './pages/Profile';
import Users from './pages/Users';
import Recommendations from './components/Recommendations';
import RecommendMovie from './components/RecommendMovie';
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/ForgotPassword';
import EditProfile from './pages/EditProfile';




const App = () =>{
  const [user, setUser] = useState(null);
  const [token ,setToken] = useState(localStorage.getItem("token") || null);

  const [darkMode , setDarkMode] = useState(
    localStorage.getItem("darkMode")==="true"
  );

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    console.log("🔍 localStorage’dan token alındı:", storedToken);
    if (storedToken && storedToken !== token) {
      setToken(storedToken);
  }
  const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      console.log("📢 LocalStorage’dan kullanıcı alındı:", storedUser);
      setUser(storedUser);
    }else{
      console.log("Kullanıcı bilgisi bulunamadı!");
    }
  }, []);

  








useEffect(() => {
  document.body.classList.toggle("dark-mode", darkMode);
  localStorage.setItem("darkMode", darkMode);
}, [darkMode]);

const toggleDarkMode = () => {
  setDarkMode(prevMode => !prevMode);
};




  return (
    
    <Router>
     <Navbar token={token} setToken={setToken} darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
     <div className='container'>
      <Routes>
          <Route path="/" element={<Home token={token}/>} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/login' element={<Login setToken={setToken}/>}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path='/favorites' element={<Favorites token={token}/>}></Route>
          <Route path="/profile/:id" element={<Profile token={token} />} />
          <Route path="/profile/edit" element={<EditProfile token={token} />} />

          <Route path="/users" element={<Users token={token} />} />
          
          <Route path="/recommendations" element={
            user ? <Recommendations token={token} username={user.username} /> : <p>Yükleniyor...</p>
          } />
          <Route path="/recommend" element={<RecommendMovie token={token} />} />
      </Routes>
      </div>
    </Router>
    

  );
};


export default App;