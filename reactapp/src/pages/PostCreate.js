import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import axios from "axios";

function PostCreate() {
  const navigate = useNavigate();

  const { token } = useAuth();

  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //userInfo있으면 글 등록
    const requestData = {
      post_Title: form.title,
      post_Content: form.content,
    };
    console.log(JSON.stringify(requestData));
    axios.post(
      "https://guparesourcepack.duckdns.org:8443/api/post/reg",
      JSON.stringify(requestData),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((res)=>{
      navigate("/");
    })
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">글쓰기</h1>

      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-semibold">
            제목
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-gray-700 font-semibold"
          >
            내용
          </label>
          <textarea
            id="content"
            name="content"
            value={form.content}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            rows="6"
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            등록
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostCreate;
