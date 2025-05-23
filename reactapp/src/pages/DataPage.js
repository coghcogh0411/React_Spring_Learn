import React, { useEffect, useState } from "react";
import DataCategory from "../components/DataCategory";
import DataUploadForm from "../components/DataUploadForm";
import Header from "../components/Header";
import { useAuth } from "../AuthContext";
import axios from "axios";

const DataPage = () => {
  const { userInfo } = useAuth();

  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);

  const handleFileClick = (file) => {
    window.location.href = `/data/${file}`;
  };

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/data/get");
      const allData = res.data;

      const d1 = allData.filter((item) => item.data_Option === "1");
      const d2 = allData.filter((item) => item.data_Option === "2");
      const d3 = allData.filter((item) => item.data_Option === "3");

      setData1(d1);
      setData2(d2);
      setData3(d3);
    } catch (error) {
      console.log("자료실 조회 오류", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <Header />
      <div className="max-w-7xl mx-auto px-6 pt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <DataCategory
            title="데이터1"
            data={data1}
            onItemClick={handleFileClick}
          />
          <DataCategory
            title="데이터2"
            data={data2}
            onItemClick={handleFileClick}
          />
          <DataCategory
            title="데이터3"
            data={data3}
            onItemClick={handleFileClick}
          />
        </div>
      </div>
      {userInfo.id==="asd" && <DataUploadForm afterUpload={fetchData}/>}
    </div>
  );
};

export default DataPage;
