import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/Home';
import Register from './pages/Register';
import Nav from './components/Nav';
import axios from 'axios';
import Forgot from './pages/Forgot';
import Reset from './pages/Reset';

function App() {

  const [user, setUser] = useState(null);
  const [login, setLogin] = useState(false);


  useEffect(() => {
    (
      async () => {

        try {
          const response = await axios.get('user');
          const user = response.data;


          console.log(response);
          setUser(user);
          
        } catch (e) {
          setUser(null);

        }
      }
    )();

  }, [login]);
  return (
    <div className="App">

     
      <BrowserRouter>
        <Nav user={user} setLogin={() => setLogin(false)} />

        <Routes>
          <Route path="/login" element={<Login setLogin={() => setLogin(true)} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />

          <Route path="/reset/:token" element={<Reset />} />       
          <Route path="/" element={<Home user={user} />} />
          

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
