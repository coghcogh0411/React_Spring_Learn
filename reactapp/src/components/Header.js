import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Header = () => {
  const { userInfo, logout } = useAuth();

  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <div className="flex items-center space-x-8">
        {/* 제목 */}
        <Link to="/" className="text-xl font-bold">Gupa Blog</Link>

        {/* 메뉴 항목들 */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="hover:underline">게시판</Link>
          <Link to="/data" className="hover:underline">자료실</Link>
          <Link to="/chat" className="hover:underline">채팅방</Link>
          <Link to="/wiki" className="hover:underline">Wiki</Link>
        </div>
      </div>

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
