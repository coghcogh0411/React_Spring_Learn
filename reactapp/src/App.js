import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import Board from './pages/Board.js';
import PostDetail from './pages/PostDetail.js';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />}/>
      <Route path='/signup' element={<Signup />}/>
      <Route path='/board' element={<Board />}/>
      <Route path='/postDetail' element={<PostDetail />}/>
    </Routes>
  );
}

export default App;
