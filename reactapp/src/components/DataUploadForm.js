import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import axios from "axios";

const DataUploadForm = ({afterUpload}) => {
  const { token } = useAuth();

  const [isTrue, setIsTrue] = useState(true);
  const toggleUploadTable = () => {
    setIsTrue((prevState) => !prevState);
  };

  const [form, setForm] = useState({
    title: "",
    file: null,
    option: "",
  });

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    if (type === "file") {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 기본 동작(페이지 새로고침) 막기

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("file", form.file);
    formData.append("option", form.option);

    for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/data/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("업로드 성공", response.data);
      afterUpload();
    } catch (error) {
      console.error("업로드 실패", error);
    }
  };

  return (
    <div>
      <div
        id="uploadTbl"
        className={`fixed w-[30%] ${
          isTrue ? "translate-y-110" : "translate-y-[88%]"
        } bottom-0 transition-transform duration-500 ease-out`}
      >
        <div
          id="menuTbl"
          onClick={toggleUploadTable}
          className="w-10 h-10 mx-auto flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-105 bg-gray-800 text-white rounded-lg"
        >
          {isTrue ? "▼" : "▲"}
        </div>

        <form
          onSubmit={handleSubmit}
          className="upload-table w-350 h-300 mx-auto bg-gray-800 p-4 rounded-2xl space-y-4"
        >
          <div className="flex gap-2">
            <input
              type="radio"
              id="option1"
              name="option"
              value="1"
              className="hidden peer/option1"
              onChange={handleChange}
            />
            <label
              htmlFor="option1"
              className="inline-block px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-full cursor-pointer transition-all duration-300 peer-checked/option1:bg-blue-500 peer-checked/option1:border-blue-500 hover:bg-gray-700"
            >
              옵션 1
            </label>

            <input
              type="radio"
              id="option2"
              name="option"
              value="2"
              className="hidden peer/option2"
              onChange={handleChange}
            />
            <label
              htmlFor="option2"
              className="inline-block px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-full cursor-pointer transition-all duration-300 peer-checked/option2:bg-blue-500 peer-checked/option2:border-blue-500 hover:bg-gray-700"
            >
              옵션 2
            </label>
          </div>

          <div>
            <label className="block text-white mb-1">제목</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <input
              type="file"
              name="file"
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-lg max-w-full sm:max-w-[200px] w-full"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow w-full sm:w-auto"
            >
              업로드
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DataUploadForm;
