import React, { useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

function RegisterPage() {
  const [form, setForm] = useState({
    id: "",
    name: "",
    password: "",
    confirmPw: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPw) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    console.log("회원가입 정보:", form);
    axios.post("http://localhost:8080/api/member/signup", form);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full sm:max-w-sm md:max-w-md lg:max-w-lg">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-600 mb-6">
          회원가입
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
            type="text"
            name="name"
            placeholder="이름"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <br />
          <input
            type="password"
            name="confirmPw"
            placeholder="비밀번호 확인"
            value={form.confirmPw}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <br />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
          >
            회원가입
            </button>
        </form>
        <p className="text-sm text-center mt-4">
          이미 계정이 있으신가요?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-semibold"
          >
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
