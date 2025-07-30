import React, { useEffect, useRef, useState } from "react";
import { Editor, Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import axios from "axios";

function MarkdownEditor() {
  const editorRef = useRef();

  const [categories, setCategories] = useState([]);

  const [showInput, setShowInput] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [nowCategory, setNowCategory] = useState(categories[0]);

  const getCategory = async () => {
    try {
      const category = await axios.get(
        "http://localhost:8080/api/wiki/get/title"
      );
      setCategories(category.data);
    } catch (error) {
      setCategories([]);
    }
  };
  
  useEffect(() => {
    getCategory();
  }, []);

  const handleSelectCategory = (wiki_Title) =>{
    setNowCategory(wiki_Title);
    //타이틀관련내용가져오기
  }

  const handleAddCategory = () => {
    if (newCategory.trim() !== "" && !categories.includes(newCategory)) {
      axios.post("http://localhost:8080/api/wiki/reg/title", {
        wiki_Title: newCategory,
      }).then(()=>{
        setCategories([...categories, newCategory]);
        setNewCategory("");
        setShowInput(false);
      })
    }
  };
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
      <aside className="w-64 bg-white shadow-md p-6">
        <h3 className="text-xl font-bold mb-4">📂 Wiki 카테고리</h3>
        <ul className="space-y-2">
          {Array.isArray(categories) && categories.length > 0 ? (
            categories.map((cat, idx) => (
              <li onClick={handleSelectCategory(cat.wiki_Title)} key={idx} className="hover:text-blue-600 cursor-pointer">
                {cat.wiki_Title}
              </li>
            ))
          ) : (
            <li className="text-gray-400 italic">카테고리가 없습니다</li>
          )}
          {showInput ? (
            <div className="flex space-x-2">
              <input
                type="text"
                className="flex-1 border rounded px-2 py-1 text-sm"
                placeholder="새 카테고리명"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddCategory();
                }}
              />
              <button
                className="text-blue-600 font-bold"
                onClick={handleAddCategory}
              >
                +
              </button>
            </div>
          ) : (
            <button
              className="text-blue-600 text-sm hover:underline"
              onClick={() => setShowInput(true)}
            >
              + 카테고리 추가
            </button>
          )}
        </ul>
      </aside>

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
