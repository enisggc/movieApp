
import './App.css';
import React,{useState} from 'react';
import { BrowserRouter as Router, Routes, Route,Link } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Register from './pages/Register';
import Login from './pages/Login';
import Favorites from "./pages/Favorites";









const App = () =>{

  const [token ,setToken] = useState(localStorage.getItem("token"));
  return (
    <Router>
      <nav>
        <Link to="Anasayfa"></Link>
        {!token ? (
          <>
          <Link to="/register">Kayıt Ol</Link>
          <Link to="/login">Giriş Yap</Link>
          </>
        ):(
          <>
          <Link to = "/favorites">Favorilerim</Link>
          <button onClick={()=>{
            setToken(null);
            localStorage.removeItem("token");
          }}>Çıkış Yap</button>
          </>
        )}
      </nav>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/login' element={<Login setToken={setToken}/>}></Route>
      <Route path='/favorites' element={<Favorites token={token}/>}></Route>
      </Routes>
    </Router>
  );
};


export default App;