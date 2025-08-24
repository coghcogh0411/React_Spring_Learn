import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem("token");
  const storedUserInfo = localStorage.getItem("userInfo");
  const [token, setToken] = useState(storedToken);
  const [userInfo, setUserInfo] = useState(
    storedUserInfo ? JSON.parse(storedUserInfo) : null
  );

  const login = async ({ token, id, name }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userInfo", JSON.stringify({ id, name }));
    
    setToken(token);
    setUserInfo({ id, name });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    setToken(null);
    setUserInfo(null);
  };

  useEffect(() => {
    if (!token) return;
  
    const fetchUserInfo = async () => {
      try {
        const res = await axios.get("https://guparesourcepack.duckdns.org/api/member/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserInfo(res.data);
        localStorage.setItem("userInfo", JSON.stringify(res.data));
      } catch (e) {
        console.log("토큰 만료 혹은 유효하지 않음", e);
        logout(); // 여기서 토큰 만료되면 자동 로그아웃
      }
    };
  
    fetchUserInfo();
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, login, logout, userInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
