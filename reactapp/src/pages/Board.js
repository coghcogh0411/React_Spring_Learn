import React, { useEffect, useState } from "react";
import axios from "axios";
import PostList from "../components/PostList";
import { Link } from "react-router-dom";

const Board = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);

  const fetchBoard = async () => {
    try {
      const res = await axios.get("https://guparesourcepack.duckdns.org/api/post/get", {
        params: {
          page: page,
        },
      });
      setPosts((prevPosts) => [...prevPosts, ...res.data]);
    } catch (error) {
      console.log("게시글 조회 오류", error);
    }
  };

  const handleScroll = () => {
    const bottom =
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight;
    if (bottom) {
      setPage((prevPage) => prevPage + 1); // 페이지 번호 증가
    }
  };

  useEffect(() => {
    fetchBoard(); // 처음에 첫 페이지 로드
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-blue-50">
      <main className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-600">게시글 목록</h2>
          <Link
            to="/posts/new"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            게시글 등록
          </Link>
        </div>
        <PostList posts={posts} />
      </main>
    </div>
  );
};

export default Board;
