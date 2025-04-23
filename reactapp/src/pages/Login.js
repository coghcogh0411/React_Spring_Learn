import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
function LoginPage() {
  const [form, setForm] = useState({
    id: "",
    pw: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("로그인 정보:", form);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          로그인
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="id"
            placeholder="아이디"
            value={form.id}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <br />
          <input
            type="password"
            name="pw"
            placeholder="비밀번호"
            value={form.pw}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <br />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
          >
            로그인
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          계정이 없으신가요?{" "}
          <Link
            to="/signup"
            className="text-blue-600 hover:underline font-semibold"
          >
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
