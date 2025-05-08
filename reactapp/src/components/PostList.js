import PostCard from "./PostCard";

const PostList = ({ posts }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {posts.map((post) => (
      <PostCard key={post.post_No} post={post} />
    ))}
  </div>
);

export default PostList;
