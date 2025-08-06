import React from "react";
import { Editor } from "@toast-ui/react-editor";
import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import axios from "axios";

const MarkdownPage = ({ isAdmin, title, content}) => {
  const editorRef = React.useRef();
  const viewerRef = React.useRef();

  const uploadImages = async (blob, callback) => {
    // 폼데이터 생성 후,
    const formData = new FormData();
    // blob로 전달받은 파일을 담고,
    formData.append("file", blob);
    try {
      const res = await axios.post(
        "https://guparesourcepack.duckdns.org:8443/api/wiki/img/temp/upload",
        formData
      );
      const filename = res.data.url;
      console.log("file", filename);
      const imageUrl = `https://guparesourcepack.duckdns.org:8443/api/wiki/img/temp/${filename}`;
      callback(imageUrl);
    } catch (error) {
      console.log(error);
    }
  };
  const submitWiki = (e) => {
    const markdown = editorRef.current.getInstance().getMarkdown();
    console.log(title);
    axios.post("https://guparesourcepack.duckdns.org:8443/api/wiki/reg/content",{
      wiki_Title: title,
      wiki_Content: markdown
    })
  };
  return (
    <div>
      {isAdmin ? (
        <div>
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
      ) : (
        <Viewer ref={viewerRef} initialValue={content} key={title} />
      )}
    </div>
  );
};

export default MarkdownPage;
