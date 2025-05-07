import React, { useEffect, useState } from "react";
import axios from "axios";
import PostList from "../components/PostList";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const Board = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/post/get") // 예시 URL
      .then((res) => {
        setPosts(res.data);
        console.log(posts);
      })
      .catch((err) => {
        console.error("게시글 불러오기 실패", err);
      });
  }, []);

  return (
    <div className="min-h-screen bg-blue-50">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-600">게시글 목록</h2>
          <Link to="/posts/new" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            게시글 등록
          </Link>
        </div>
        <PostList posts={posts} />
      </main>
    </div>
  );
};

export default Board;
