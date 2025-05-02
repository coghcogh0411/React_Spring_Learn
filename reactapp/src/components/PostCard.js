import { Link } from "react-router-dom";

const PostCard = ({ post }) => (
  <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
    <h3 className="text-lg font-bold mb-2">{post.title}</h3>
    <p className="text-gray-600 mb-2">{post.summary}</p>
    <Link to={`/posts/${post.id}`} className="text-blue-500 hover:underline">자세히 보기</Link>
  </div>
);

export default PostCard;
