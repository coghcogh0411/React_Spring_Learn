import React from "react";

const DataCategory = ({ title, data, onItemClick }) => (
  <div className="p-5 bg-white rounded-2xl shadow hover:shadow-lg transition-all">
    <h2 className="text-xl font-bold text-blue-700 border-b pb-2 mb-4">{title}</h2>
    <div className="space-y-3">
      {data && data.map((item, idx) => (
        <div
          key={idx}
          className="p-3 bg-blue-50 hover:bg-blue-100 cursor-pointer rounded-lg text-sm text-gray-800"
          onDoubleClick={() => onItemClick(item.data_File)}
        >
          {item.data_Title}
        </div>
      ))}
    </div>
  </div>
);

export default DataCategory;
