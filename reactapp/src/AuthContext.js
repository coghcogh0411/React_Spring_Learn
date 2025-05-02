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
    if (!token || userInfo) {
      console.log("있음");
      return;
    }

    const fetchUserInfo = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/member/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserInfo(res.data);
        localStorage.setItem("userInfo", JSON.stringify(res.data));
      } catch (e) {
        console.log("유저 정보 불러오기 실패", e);
        logout();
      }
    };
    fetchUserInfo();
  }, [token, userInfo]);

  return (
    <AuthContext.Provider value={{ token, login, logout, userInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
