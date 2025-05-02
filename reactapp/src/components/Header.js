import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Header = () => {
  const { userInfo, logout } = useAuth();

  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">React_Spring_Learn</Link>
      <div className="flex items-center space-x-4">
        {userInfo ? (
          <>
            <span>{userInfo.name}님</span>
            <button onClick={logout} className="bg-white text-blue-500 px-3 py-1 rounded hover:bg-gray-100">
              로그아웃
            </button>
          </>
        ) : (
          <Link to="/login" className="hover:underline">로그인</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
