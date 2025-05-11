import React from "react";
import DataCategory from "../components/DataCategory";
import DataUploadForm from "../components/DataUploadForm";
import Header from "../components/Header";
import { useAuth } from "../AuthContext";

const DataPage = ({ data1,data2,data3,data4}) => {
  const { token, userInfo } = useAuth();
  const handleFileClick = (file) => {
    window.location.href = `/data/${file}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <Header />
      <div className="max-w-7xl mx-auto px-6 pt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <DataCategory title="데이터1" data={data1} onItemClick={handleFileClick} />
          <DataCategory title="데이터2" data={data2} onItemClick={handleFileClick} />
          <DataCategory title="데이터3" data={data3} onItemClick={handleFileClick} />
          <DataCategory title="데이터4" data={data4} onItemClick={handleFileClick} />
        </div>

        {userInfo && <DataUploadForm token={token} />}
      </div>
    </div>
  );
};

export default DataPage;