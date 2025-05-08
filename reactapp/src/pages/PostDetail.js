import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";

const PostDetail = () => {
  const { id } = useParams(); // post_No
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/post/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.error("게시글 불러오기 실패", err));
  }, [id]);

  if (!post) return <div className="p-10 text-center">로딩 중...</div>;

  return (
    <div className="min-h-screen bg-blue-50">
      <Header />
      <main className="max-w-4xl mx-auto p-6 bg-white shadow rounded mt-10">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">{post.post_Title}</h1>
        <div className="text-gray-500 mb-2">
          <span className="mr-4">작성자: {post.post_Writer}</span>
          <span>{new Date(post.post_Date).toLocaleString()}</span>
        </div>
        <hr className="my-4" />
        <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-wrap">{post.post_Content}</p>
        <div className="mt-6">
          <Link to="/" className="text-blue-500 hover:underline">← 목록으로 돌아가기</Link>
        </div>
      </main>
    </div>
  );
};

export default PostDetail;
