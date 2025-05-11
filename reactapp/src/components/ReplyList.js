import React from "react";

const ReplyList = ({ replies }) => {
  if (!replies || replies.length === 0) {
    return <p className="text-gray-400">아직 댓글이 없습니다.</p>;
  }

  return (
    <ul className="space-y-4">
      {replies.map((reply) => (
        <li key={reply.reply_No} className="p-4 border rounded bg-gray-50">
          <div className="text-sm text-gray-600 mb-1">
            {reply.reply_Writer} ·{" "}
            {new Date(reply.reply_Date).toLocaleString()}
          </div>
          <div className="text-gray-800">{reply.reply_Content}</div>
        </li>
      ))}
    </ul>
  );
};

export default ReplyList;
