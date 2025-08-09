import React, { useEffect, useRef, useState } from "react";
import { Editor, Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import axios from "axios";
import { useAuth } from "../AuthContext";
import WikiMarkdownPage from '../components/WikiMarkdownPage';

function MarkdownEditor() {
  const editorRef = useRef();
  const {userInfo} = useAuth();

  const isAdmin = userInfo && userInfo.id === 'asd';

  const [categories, setCategories] = useState([]);

  const [showInput, setShowInput] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [nowCategory, setNowCategory] = useState();

  const [content, setContent] = useState("");

  const getCategory = async () => {
    try {
      const category = await axios.get(
        "https://guparesourcepack.duckdns.org:8443/api/wiki/get/title"
      );
      setCategories(category.data);

      setNowCategory(category.data[0].wiki_Title);
    } catch (error) {
      setCategories([]);
    }
  };
  
  const getContent = async (wiki_Title) =>{
    const res = await axios.get("https://guparesourcepack.duckdns.org:8443/api/wiki/get/content",{
      params:{
        wiki_Title: wiki_Title,
      }
    });
    setContent(res.data.wiki_Content);
  }
  const handleSelectCategory = (wiki_Title) =>{
    setNowCategory(wiki_Title);
  }
  
  const handleAddCategory = () => {
    if (newCategory.trim() !== "" && !categories.includes(newCategory)) {
      axios.post("https://guparesourcepack.duckdns.org:8443/api/wiki/reg/title", {
        wiki_Title: newCategory,
      }).then(()=>{
        setCategories([...categories, { wiki_Title: newCategory }]);
        setNewCategory("");
        setShowInput(false);
      })
    }
  };
  useEffect(() => {
    getCategory();
    
  }, []);

  useEffect(() => {
  if (nowCategory) {
    getContent(nowCategory);
  }
}, [nowCategory]);
  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-64 bg-white shadow-md p-6">
        <h3 className="text-xl font-bold mb-4">📂 Wiki 카테고리</h3>
        <ul className="space-y-2">
          {Array.isArray(categories) && categories.length > 0 ? (
            categories.map((cat, idx) => (
              <li onClick={() => handleSelectCategory(cat.wiki_Title)} key={idx} className="hover:text-blue-600 cursor-pointer">
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
            {nowCategory}
          </h2>
          <WikiMarkdownPage isAdmin={isAdmin} title={nowCategory} content={content}></WikiMarkdownPage>
        </div>
      </main>
    </div>
  );
}

export default MarkdownEditor;
