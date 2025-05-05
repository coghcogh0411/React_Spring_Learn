import PostCard from "./PostCard";

const dummyPosts = [
  {
    id: 1,
    title: "첫 번째 게시글",
    content: "이것은 첫 번째 게시글 내용입니다.",
  },
  {
    id: 2,
    title: "두 번째 게시글",
    content: "이것은 두 번째 게시글입니다.",
  },
  {
    id: 3,
    title: "세 번째 게시글",
    content: "이것은 세 번째 게시글의 내용입니다.",
  },
];

const PostList = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {dummyPosts.map((post) => (
      <PostCard key={post.id} post={post} />
    ))}
  </div>
);

export default PostList;
