import React, { useRef } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import axios from "axios";

function MarkdownEditor() {
  const editorRef = useRef();

  const uploadImages = async (blob, callback) => {
    // 폼데이터 생성 후,
    const formData = new FormData();
    // blob로 전달받은 파일을 담고,
    formData.append("file", blob);
    try {
      console.log(blob);
      console.log(callback);

      const res = axios.post(
        "http://localhost:8080/api/wiki/img/temp/upload",
        formData
      );
      const filename = await res.data.url;
      console.log(filename)
      const imageUrl = `http://localhost:8080/api/wiki/img/temp/${filename}`;
      callback(imageUrl);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
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
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow transition">
            저장하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default MarkdownEditor;
