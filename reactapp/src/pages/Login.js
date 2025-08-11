import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../AuthContext";
import kakaoLoginImg from "../images/kakao_login.png";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({
    id: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("로그인 정보:", form);
    try {
      const requestData = {
        id: form.id,
        password: form.password,
      };
      const res = await axios.post(
        "https://guparesourcepack.duckdns.org:8443/api/member/login",
        JSON.stringify(requestData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const token = res.data.token;
      const id = res.data.id;
      const name = res.data.name;
      login({ token, id, name });
      navigate("/");
      alert("로그인 성공");
    } catch (error) {
      console.log(error);
      alert("로그인 실패");
    }
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
            name="password"
            placeholder="비밀번호"
            value={form.password}
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
        <div className="my-4">
          <button
            
            style={{ border: "none", background: "transparent", padding: 0 }}
          >
            <img
              src={kakaoLoginImg}
              alt="카카오 로그인"
              style={{ width: "400px", height:"50px"}}
            />
          </button>
        </div>
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
