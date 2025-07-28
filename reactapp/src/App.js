import "./App.css";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Login from "./pages/Login.js";
import Signup from "./pages/Signup.js";
import Board from "./pages/Board.js";
import PostDetail from "./pages/PostDetail.js";
import PostCreate from './pages/PostCreate.js'
import DataPage from "./pages/DataPage.js";
import ChatPage from './pages/ChatPage.js'
import WikiPage from './pages/Wiki.js'
import Header from './components/Header.js'

function App() {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Board />} />
        <Route path="/postDetail" element={<PostDetail />} />
        <Route path="/posts/new" element={<PostCreate />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/data" element={<DataPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/wiki" element={<WikiPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
