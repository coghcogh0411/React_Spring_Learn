import React, { useRef } from "react";
import { Editor, Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import axios from "axios";

function MarkdownViewer() {}

function MarkdownEditor() {
  const editorRef = useRef();
  const uploadImages = async (blob, callback) => {
    // 폼데이터 생성 후,
    const formData = new FormData();
    // blob로 전달받은 파일을 담고,
    formData.append("file", blob);
    try {
      const res = await axios.post(
        "http://localhost:8080/api/wiki/img/temp/upload",
        formData
      );
      const filename = res.data.url;
      console.log("file", filename);
      const imageUrl = `http://localhost:8080/api/wiki/img/temp/${filename}`;
      callback(imageUrl);
    } catch (error) {
      console.log(error);
    }
  };
  const submitWiki = (e) => {
    const markdownContente = editorRef.current.getInstance().getMarkdown();
    console.log(markdownContente);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* 왼쪽 사이드바 */}
      <aside className="w-64 bg-white shadow-md p-6">
        <h3 className="text-xl font-bold mb-4">📂 Wiki 카테고리</h3>
        <ul className="space-y-2">
          <li className="hover:text-blue-600 cursor-pointer">프론트엔드</li>
          <li className="hover:text-blue-600 cursor-pointer">백엔드</li>
          <li className="hover:text-blue-600 cursor-pointer">데이터베이스</li>
          <li className="hover:text-blue-600 cursor-pointer">운영체제</li>
        </ul>
      </aside>

      {/* 오른쪽 메인 영역 */}
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
            📝 문서 작성 (Toast UI Editor)
          </h2>

          <Editor
            ref={editorRef}
            previewStyle="vertical"
            height="500px"
            initialEditType="markdown"
            useCommandShortcut={true}
            hooks={{
              addImageBlobHook: uploadImages,
            }}
          />

          <div className="flex justify-end">
            <button
              onClick={submitWiki}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow transition"
            >
              저장하기
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MarkdownEditor;
