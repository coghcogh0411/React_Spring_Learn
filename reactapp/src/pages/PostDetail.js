import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import axios from "axios";
import Header from "../components/Header";
import ReplyList from "../components/ReplyList";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [replies, setReplies] = useState([]);
  const [newReply, setNewReply] = useState("");
  const { userInfo, token } = useAuth();

  // 게시글 불러오기
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/post/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.error("게시글 불러오기 실패", err));
  }, [id]);

  // 댓글 불러오기
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/post/${id}/getReply`)
      .then((res) => setReplies(res.data))
      .catch((err) => console.error("댓글 불러오기 실패", err));
  }, [id]);

  const handleReplySubmit = async () => {
    if (!newReply.trim()) return;
    try {
      await axios.post(
        `http://localhost:8080/api/post/${id}/regReply`,
        {
          reply_Content: newReply
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNewReply("");
      // 댓글 다시 불러오기
      const res = await axios.get(`http://localhost:8080/api/post/${id}/getReply`);
      setReplies(res.data);
    } catch (err) {
      console.error("댓글 작성 실패", err);
    }
  };

  if (!post) return <div className="p-10 text-center">로딩 중...</div>;

  return (
    <div className="min-h-screen bg-blue-50">
      <main className="max-w-4xl mx-auto p-6 bg-white shadow rounded mt-10">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">
          {post.post_Title}
        </h1>
        <div className="text-gray-500 mb-2">
          <span className="mr-4">작성자: {post.post_Writer}</span>
          <span>{new Date(post.post_Date).toLocaleString()}</span>
        </div>
        <hr className="my-4" />
        <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-wrap">
          {post.post_Content}
        </p>

        <div className="mt-10">
          <Link to="/" className="text-blue-500 hover:underline">
            ← 목록으로 돌아가기
          </Link>
        </div>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">댓글</h2>

          {userInfo ? (
            <div className="mb-6">
              <textarea
                className="w-full p-3 border rounded resize-none"
                rows="3"
                placeholder="댓글을 입력하세요..."
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
              />
              <button
                onClick={handleReplySubmit}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                등록
              </button>
            </div>
          ) : (
            <p className="text-gray-500 mb-6">
              댓글을 작성하려면 로그인하세요.
            </p>
          )}

          {/* 댓글 목록 */}
          <ReplyList replies={replies} />
        </section>
      </main>
    </div>
  );
};

export default PostDetail;
