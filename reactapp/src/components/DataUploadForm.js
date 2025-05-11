import React, { useState } from "react";

const DataUploadForm = ({ token }) => {
  const [isTrue, setIsTrue] = useState(true);

  const toggleUploadTable = () => {
    setIsTrue((prevState) => !prevState);
  };
  return (
    <div>

      {/* 업로드 테이블 */}
      <div
        id="uploadTbl"
        className={`fixed w-full ${isTrue ? "translate-y-full" : "translate-y-100"} bottom-0 transition-transform duration-500 ease-out`}
      >
      {/* 메뉴 버튼 클릭 시 업로드 테이블을 숨기거나 보이게 */}
      <div
        id="menuTbl"
        onClick={toggleUploadTable}
        className="cursor-pointer transition-transform duration-300 hover:scale-110 bg-gray-800 text-white py-2 px-4 rounded-lg"
      >
        메뉴
      </div>
        <div className="upload-table w-350 h-300  mx-auto bg-gray-800 rounded-2xl">
          {/* 폼 내용 */}
          <form action="/data.upload" method="post" encType="multipart/form-data">
            <input name="token" value={token} type="hidden" />
            <div className="flex flex-wrap gap-6 mb-6">
              <label className="flex items-center gap-2 text-gray-700">
                <input type="radio" name="category" value="e" className="accent-blue-600" /> 데이터1
              </label>
              <label className="flex items-center gap-2 text-gray-700">
                <input type="radio" name="category" value="b" className="accent-blue-600" /> 데이터2
              </label>
              <label className="flex items-center gap-2 text-gray-700">
                <input type="radio" name="category" value="p" className="accent-blue-600" /> 데이터3
              </label>
              <label className="flex items-center gap-2 text-gray-700">
                <input type="radio" name="category" value="g" className="accent-blue-600" /> 데이터4
              </label>
            </div>
            <div className="mb-6">
              <label className="block text-gray-800 font-medium mb-1">제목</label>
              <input
                name="title"
                type="text"
                className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <input type="file" name="fileTemp" className="border border-gray-300 p-2 rounded-lg" />
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow">
                업로드
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DataUploadForm;
